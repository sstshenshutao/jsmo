class Instruction {
    constructor() {

    }

    accept(visitor) {
        console.log("prototype Instruction")
    }
}

class DisplayInstruction extends Instruction {
    accept(visitor) {
        console.log("prototype DisplayInstruction")
    }
}

class GraphDisplayInstruction extends DisplayInstruction {
    accept(visitor) {
        console.log("prototype GraphDisplayInstruction")
    }
}

class TextDisplayInstruction extends DisplayInstruction {
    accept(visitor) {
        console.log("prototype TextDisplayInstruction")
    }
}

class ControlInstruction extends Instruction {
    accept(visitor) {
        console.log("prototype ControlInstruction")
    }
}

class AudioInstruction extends Instruction {
    accept(visitor) {
        console.log("prototype AudioInstruction")
    }
}

class SystemInstruction extends Instruction {
    accept(visitor) {
        console.log("prototype SystemInstruction")
    }
}

//-----------------instructions classes-------------------
class Say extends TextDisplayInstruction {
    accept(visitor) {
        visitor.visitSay(this);
    }
}

class Text extends TextDisplayInstruction {
    accept(visitor) {
        visitor.visitText(this);
    }
}

class Text_off extends TextDisplayInstruction {
    accept(visitor) {
        visitor.visitText_off(this);
    }
}

class Waitkey extends TextDisplayInstruction {
    accept(visitor) {
        visitor.visitWaitkey(this);
    }
}

class Title extends TextDisplayInstruction {
    accept(visitor) {
        visitor.visitTitle(this);
    }
}

class Title_dsp extends TextDisplayInstruction {
    accept(visitor) {
        visitor.visitTitle_dsp(this);
    }
}

class Chara extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara(this);
    }
}

class Chara_cls extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_cls(this);
    }
}

class Chara_pos extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_pos(this);
    }
}

// for executor: bg can have different variants,
// the x,y parameters are percentage. default value (0,0)
class Bg extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitBg(this);
    }
}

class Flash extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitFlash(this);
    }
}

class Quake extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitQuake(this);
    }
}

class Fade_out extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitFade_out(this);
    }
}

class Fade_in extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitFade_in(this);
    }
}

class Movie extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitMovie(this);
    }
}

class Textbox extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitTextbox(this);
    }
}

class Chara_quake extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_quake(this);
    }
}

class Chara_down extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_down(this);
    }
}

class Chara_up extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_up(this);
    }
}

class Scroll extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitScroll(this);
    }
}

class Chara_y extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_y(this);
    }
}

class Chara_scroll extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_scroll(this);
    }
}

class Anime_on extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitAnime_on(this);
    }
}

class Anime_off extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitAnime_off(this);
    }
}

class Chara_anime extends GraphDisplayInstruction {
    accept(visitor) {
        visitor.visitChara_anime(this);
    }
}

class Set extends ControlInstruction {
    accept(visitor) {
        visitor.visitSet(this);
    }
}

class Add extends ControlInstruction {
    accept(visitor) {
        visitor.visitAdd(this);
    }
}

class Sub extends ControlInstruction {
    accept(visitor) {
        visitor.visitSub(this);
    }
}

class Label extends ControlInstruction {
    accept(visitor) {
        visitor.visitLabel(this);
    }
}

class Goto extends ControlInstruction {
    accept(visitor) {
        visitor.visitGoto(this);
    }
}

class If___goto extends ControlInstruction {
    accept(visitor) {
        visitor.visitIf___goto(this);
    }
}

class Change extends ControlInstruction {
    accept(visitor) {
        visitor.visitChange(this);
    }
}

class Call extends ControlInstruction {
    accept(visitor) {
        visitor.visitCall(this);
    }
}

class Ret extends ControlInstruction {
    accept(visitor) {
        visitor.visitRet(this);
    }
}

class Sel extends ControlInstruction {
    accept(visitor) {
        visitor.visitSel(this);
    }
}

class Select_text extends ControlInstruction {
    accept(visitor) {
        visitor.visitSelect_text(this);
    }
}

class Select_var extends ControlInstruction {
    accept(visitor) {
        visitor.visitSelect_var(this);
    }
}

class Select_img extends ControlInstruction {
    accept(visitor) {
        visitor.visitSelect_img(this);
    }
}

class Select_imgs extends ControlInstruction {
    accept(visitor) {
        visitor.visitSelect_imgs(this);
    }
}

class Wait extends ControlInstruction {
    accept(visitor) {
        visitor.visitWait(this);
    }
}

class Wait_se extends ControlInstruction {
    accept(visitor) {
        visitor.visitWait_se(this);
    }
}

class Rand extends ControlInstruction {
    accept(visitor) {
        visitor.visitRand(this);
    }
}

class Bgm extends AudioInstruction {
    accept(visitor) {
        visitor.visitBgm(this);
    }
}

class Bgm_stop extends AudioInstruction {
    accept(visitor) {
        visitor.visitBgm_stop(this);
    }
}

class Se extends AudioInstruction {
    accept(visitor) {
        visitor.visitSe(this);
    }
}

class Se_stop extends AudioInstruction {
    accept(visitor) {
        visitor.visitSe_stop(this);
    }
}

class Vo extends AudioInstruction {
    accept(visitor) {
        visitor.visitVo(this);
    }
}

class Load extends SystemInstruction {
    accept(visitor) {
        visitor.visitLoad(this);
    }
}

class Album extends SystemInstruction {
    accept(visitor) {
        visitor.visitAlbum(this);
    }
}

class Music extends SystemInstruction {
    accept(visitor) {
        visitor.visitMusic(this);
    }
}

class Date extends SystemInstruction {
    accept(visitor) {
        visitor.visitDate(this);
    }
}

class Config extends SystemInstruction {
    accept(visitor) {
        visitor.visitConfig(this);
    }
}

class ArrayInstruction extends Instruction {
    constructor(instructionArray) {
        super();
        this.instructionArray = instructionArray;
    }

    accept(visitor) {
        visitor.visitArrayInstruction(this);
    }
}

export {
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
};
