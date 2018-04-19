Framework.Game.addNewLevel({Start: new StartPage()});
Framework.Game.addNewLevel({StageSelect: new StageSelect()});
Object.keys(Stages).forEach((key) => {
    let temp = {}
    temp[key] = Stages[key]
    Framework.Game.addNewLevel(temp);
})
/*Framework.Game.addNewLevel({Stage1: Stages.Stage1});
Framework.Game.addNewLevel({Stage2: Stages.Stage2});
Framework.Game.addNewLevel({Stage3: Stages.Stage3});*/
Framework.Game.addNewLevel({End: new EndPage()});
Framework.Game.start();
