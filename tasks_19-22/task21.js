const Collection = require('../collection/collection.js');
const testData3 = require('../data/data.js').testData3;

//#region TASK 21
function getDevsWithSkillsSorted() {
    const skills = Collection.make(testData3).pluck('skills').values();
    const skillNames = Object.keys(skills[0]);
    
    for(const skillName of skillNames) {
        const tempArr = Collection.make(testData3)
                                .reduce((res, dev) => {
                                    res.push({ name: dev.name, 
                                            skill: dev.skills[skillName] });
                                    return res;
                                }, []);    
        console.log(`====== ${skillName} ======`);
        tempArr.sort(compareFunc)
                .map((dev, index) => console.log(`${index + 1}. ${dev.name} - ${dev.skill}`)); 
        console.log();        
    }
}

function compareFunc(a, b) {
    return b.skill - a.skill;
}

getDevsWithSkillsSorted();
//#endregion