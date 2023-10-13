import { getDatabase, ref, set, get} from "firebase/database";

const db = getDatabase()


class Player {
    contructor(fname, lname, id, height, weight, position) {
        this.fname = fname;
        this.lname = lname;
        this.id = id;
        this.height = height;
        this.weight = weight;
        this.position = position;

    }
}

class Team {
    constructor(name, player_list, id){
        this.name = name;
        this.players = player_list;
        this.id = id;
    }

    add_player(fname, lname, id, height, weight, position){
    let player;
    player = new Player(fname, lname, id, height, weight, position);
    this.players.push(player)
    reference = ref(db, '/players/' + this.id)
    set (reference, {
        fname: this.fname, 
        lname: this.lname,
        height: this.height,
        weight: this.weight,
        position: this.position,
    });
}
}

class Practice{
    constructor(id, date){
        this.practice_id = id;
        this.practice_date = date;
    }

}

function add_practice(id, date){
    let practice = new Practice(id, date);
    reference = ref(db, '/practice/' + practice.id)
    set (reference, {
        practice_date: practice.practice_date,
    })
}