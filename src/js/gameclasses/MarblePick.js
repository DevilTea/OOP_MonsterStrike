GameClasses.MarblePick = class MarblePick {
    static testMarbles() {
        let marbles = []
        marbles.push(new GameClasses.Marble(marbles.length, marbleDataList[1743]))
        marbles.push(new GameClasses.Marble(marbles.length, marbleDataList[1032]))
        marbles.push(new GameClasses.Marble(marbles.length, marbleDataList[1746]))
        marbles.push(new GameClasses.Marble(marbles.length, marbleDataList[391]))
        return marbles
    }
}