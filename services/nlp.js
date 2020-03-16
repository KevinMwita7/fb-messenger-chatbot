module.exports = function parseEntities(nlp, name) {
    if(nlp.entities.intent && nlp.entities[0]) {
        return nlp && nlp.entities && nlp.entities.intent && nlp.entities.intent[0].value === name && nlp.entities.intent[0].confidence > 0.8;
    } else return false;
};