Framework.Game.addNewLevel({startPage: new StartPage()});
Framework.Game.addNewLevel({stage1: new GameClasses.Stage(StageTest.marblesOptions, StageTest.mapsMonstersOptions)});
Framework.Game.addNewLevel({endPage: new EndPage()});
Framework.Game.start();
