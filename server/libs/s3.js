const AWS = require('aws-sdk')


/** Load Config File */
AWS.config.loadFromPath('server/config/s3Config.json');

/** After config file load, create object for s3*/
const s3 = new AWS.S3({ region: 'us-east-1' })
let createMainBucket = (bucketName) => new Promise((resolve, reject) => {
    const bucketParams = { Bucket: bucketName };
    const headBucket = s3.headBucket(bucketParams).promise()
    headBucket.then(result => resolve(result))
        .catch((err) => {
            const bucketPromise = s3.createBucket(bucketParams).promise();
            bucketPromise.then(data => resolve(data)).catch(err => reject(err));
        })
});

const createItemObject = (bucketName, fileName, file) => new Promise((resolve, reject) => {
    const params = {
        Bucket: bucketName,
        Key: `${fileName}`,
        ContentEncoding: 'base64',
        ACL: 'public-read',
        Body: file
    };
    putObjectPromise = s3.putObject(params).promise();
    putObjectPromise.then((data) => {
        console.log("Successfully uploaded object on S3", data);
        resolve(data);
    }).catch((err) => {
        console.log("Error uploading image: ", err);
        reject(err);
    })
});


async function upload(bucketName, filename, file64String, option) {
    let file = new Buffer(file64String.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    let imageName = option + '/' + filename;
    try {
        await createMainBucket(bucketName);
    } catch (err) {
        return (err)
    }
    try {
        await createItemObject(bucketName, imageName, file);
    } catch (err) {
        return (err)
    }
    return ({ filepath: 'https://' + bucketName + '.s3-us-west-1.amazonaws.com/' + option + '/' + filename })
}



module.exports = {
    upload
};