import {
    Instruction,
    DisplayInstruction,
    GraphDisplayInstruction,
    TextDisplayInstruction,
    ControlInstruction,
    AudioInstruction,
    SystemInstruction,
    Say,
    Text,
    Text_off,
    Waitkey,
    Title,
    Title_dsp,
    Chara,
    Chara_cls,
    Chara_pos,
    Bg,
    Flash,
    Quake,
    Fade_out,
    Fade_in,
    Movie,
    Textbox,
    Chara_quake,
    Chara_down,
    Chara_up,
    Scroll,
    Chara_y,
    Chara_scroll,
    Anime_on,
    Anime_off,
    Chara_anime,
    Set,
    Add,
    Sub,
    Label,
    Goto,
    If___goto,
    Change,
    Call,
    Ret,
    Sel,
    Select_text,
    Select_var,
    Select_img,
    Select_imgs,
    Wait,
    Wait_se,
    Rand,
    Bgm,
    Bgm_stop,
    Se,
    Se_stop,
    Vo,
    Load,
    Album,
    Music,
    Date,
    Config,
    ArrayInstruction
} from '../instruction.js';

//those alias are from parseMO1 / parseMO2 ...

class Sst extends Se_stop {
    accept(visitor) {
        visitor.visitSst(this);
    }
}

class Woff extends Se_stop {
    accept(visitor) {
        visitor.visitWoff(this);
    }
}

class Eff extends Se {
    accept(visitor) {
        visitor.visitEff(this);
    }
}

//;\tSE_PLY
class SE_PLY extends Se {
    accept(visitor) {
        visitor.visitSE_PLY(this);
    }
}

class Mst extends Bgm_stop {
    accept(visitor) {
        visitor.visitMst(this);
    }
}

class TestSay extends Say {
    accept(visitor) {
        visitor.visitTestSay(this);
    }
}

// 9: "#csp 0,YU07AA,CHR_CENTER,   : charaID, filename, (needToParse)position
class Csp extends Chara {
    accept(visitor) {
        visitor.visitCsp(this);
    }
}

//#chara 2,NULL,0,0,400
//===crs 2
class Crs extends Chara {
    accept(visitor) {
        visitor.visitCrs(this);
    }
}

class End extends Change {
    accept(visitor) {
        visitor.visitEnd(this);
    }
}

class Bgtime extends ArrayInstruction {
    constructor() {
        let bg = new Bg();
        let waittime = new Waittime();
        super([waittime, bg]);
    }

    accept(visitor) {
        visitor.visitBgtime(this);
    }
}

//this is a new instruction, but also as alias.
//see @delay_until
class Waittime extends Instruction {
    accept(visitor) {
        visitor.visitWaittime(this);
    }
}

class Fade_out_sta extends Fade_out {
    accept(visitor) {
        visitor.visitFade_out_sta(this);
    }
}


export { Fade_out_sta, Bgtime, Waittime, End, TestSay, Sst, Woff, Eff, SE_PLY, Mst, Csp, Crs };
