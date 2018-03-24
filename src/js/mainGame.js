Framework.Game.fps = 240;
Framework.Game.canvasWidth = 1600;
Framework.Game.canvasHeight = 900;
Framework.Game.isBackwardCompatiable = false;

//當有要加關卡時, 可以使用addNewLevel
//第一個被加進來的Level就是啟動點, 所以一開始遊戲就進入MyMenu
//Framework.Game.addNewLevel({startPage: new StartPage()});
Framework.Game.addNewLevel({stage1: new Stage1()});
Framework.Game.start();

