GameClasses.MarblePick = class MarblePick {
    static creatMarbles(selectList) {
        let marbles = []
        selectList.forEach((marble)=>{
            marbles.push(new GameClasses.Marble(marbles.length, marbleDataList[marble.id]))
        })
        return marbles
    }
}