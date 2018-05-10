GameClasses.MarblePick = class MarblePick {
    static testMarbles() {
        let marbles = []
        marbles.push(new GameClasses.Marble(marbles.length, {
            marbleID: 1743,
            sling: 'bounce',
            HP: 23865,
            speed: 319.33,
            damage: 23001
        }))
        marbles.push(new GameClasses.Marble(marbles.length, {
            marbleID: 1032,
            sling: 'bounce',
            HP: 21698,
            speed: 312.73,
            damage: 24483
        }))
        marbles.push(new GameClasses.Marble(marbles.length, {
            marbleID: 1746,
            sling: 'pierce',
            HP: 24602,
            speed: 394.87,
            damage: 22578
        }))
        marbles.push(new GameClasses.Marble(marbles.length, {
            marbleID: 3090,
            sling: 'bounce',
            HP: 16072,
            speed: 250.60,
            damage: 18187
        }))
        return marbles
    }
}