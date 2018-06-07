{
    Framework.Game.addNewLevel({Start: new GameClasses.StartPage()})
    Framework.Game.addNewLevel({StageSelect: new GameClasses.StageSelect()})
    Framework.Game.addNewLevel({End: new GameClasses.EndPage()})
    Framework.Game.start()
}
