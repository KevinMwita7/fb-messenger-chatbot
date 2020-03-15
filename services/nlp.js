module.exports = function parseEntities(nlp, name) {
    console.log(nlp.entities.intent[0].value);
    return nlp && nlp.entities && nlp.entities.intent && nlp.entities.intent[0].value === name && nlp.entities.intent[0].confidence > 0.8;
};