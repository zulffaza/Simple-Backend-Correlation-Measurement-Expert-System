let symptoms = require('../models/symptoms');
let diseaseMetaData = require('../models/disease-meta-data');
let diseaseMetaData2 = require('../models/disease-meta-data-2');
let diseases = require('../models/diseases');

exports.findSymptoms = function (done) {
    symptoms.find(function (result) {
        let returnObj = [];

        result.forEach(function (item) {
            returnObj.push({
                id: item.symptom_id,
                symptom: item.symptom.toLocaleLowerCase()
            })
        });

        done(returnObj);
    });
};

exports.calculateInnerProduct = function (body, done) {
    diseaseMetaData.find(function (metaData1) {
        let innerProduct = [];

        for (let i = 0; i < metaData1.length; i++)
            innerProduct[metaData1[i].disease_id] = calculateInnerProduct1(body, metaData1[i]);

        diseaseMetaData2.find(function (metaData2) {
            let innerProduct2 = [];

            for (let i = 0; i < metaData2.length; i++)
                innerProduct2[metaData2[i].disease_id] = calculateInnerProduct2(innerProduct, metaData2[i]);

            diseases.find(function (diseasesResult) {
                let returnObj = [];

                diseasesResult.forEach(function (item) {
                    returnObj.push({
                        name: item.disease,
                        result: innerProduct2[item.disease_id]
                    });
                });

                done(returnObj);
            });
        });
    });
};

exports.calculateCosine = function (body, done) {
    diseaseMetaData.find(function (metaData1) {
        let cosine = [];
        let bodyVector = calculateVector1(body);

        for (let i = 0; i < metaData1.length; i++) {
            cosine[metaData1[i].disease_id] = calculateInnerProduct1(body, metaData1[i]) /
                (calculateVector1(metaData1[i]) * bodyVector);
        }

        diseaseMetaData2.find(function (metaData2) {
            let cosine2 = [];
            let cosineVector = calculateVector2(cosine);

            for (let i = 0; i < metaData2.length; i++) {
                cosine2[metaData2[i].disease_id] = calculateInnerProduct2(cosine, metaData2[i]) /
                    (calculateVector2(metaData2[i]) * cosineVector);
            }

            diseases.find(function (diseasesResult) {
                let returnObj = [];

                diseasesResult.forEach(function (item) {
                    returnObj.push({
                        name: item.disease,
                        result: cosine2[item.disease_id]
                    });
                });

                done(returnObj);
            });
        });
    });
};

function calculateInnerProduct1(body, data) {
    let sum = 0;

    for (let i = 1; i <= 19; i++)
        sum += body[i] * data[i];

    return sum;
}

function calculateInnerProduct2(body, data) {
    let sum = 0;

    for (let i = 20; i <= 32; i++)
        sum += body[i] * data[i];

    return sum;
}

function calculateVector1(data) {
    let sum = 0;

    for (let i = 1; i <= 19; i++)
        sum += Math.pow(data[i], 2);

    return Math.sqrt(sum);
}

function calculateVector2(data) {
    let sum = 0;

    for (let i = 20; i <= 32; i++)
        sum += Math.pow(data[i], 2);

    return Math.sqrt(sum);
}