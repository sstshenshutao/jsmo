import { Visitor } from '../visitor.js'

function isNumber(a) {
    return !isNaN(a);
}

function splitParameter(string, command) {
    let args = string.slice(command.length).split(',');
    args = args.map(x => delBlank(x));
    return args
}

function delBlank(charlist) {
    // del all the blanks and \r\t\n
    let i = 0;
    let startpos = 0;
    while (i < charlist.length && (charlist[i] === ' ' || charlist[i] === '\t' || charlist[i] === '\r' || charlist[i] === '\n')) {
        i += 1;
        startpos = i;
    }
    i = charlist.length - 1;
    let endpos = i;
    while (i >= 0 && (charlist[i] === ' ' || charlist[i] === '\t' || charlist[i] === '\r' || charlist[i] === '\n')) {
        i -= 1;
        endpos = i;
    }
    return charlist.slice(startpos, endpos + 1)
}

export class ParseVisitor extends Visitor {

    constructor() {
        super();
    }

    visitSay(say) {
        let args = splitParameter(this.command, '#say ');
        if (args.length === 1) {
            say.content = args[0];
        } else {
            say['name'] = args[0];
            say.content = args[1];
        }
    }

    visitText(text) {
        let args = splitParameter(this.command, '#text ');
        let content = args[0];
        if (args.length === 8) {
            text.content = content;
            text.x1 = args[1];
            text.y1 = args[2];
            text.x2 = args[3];
            text.y2 = args[4];
            text.color = args[5];
            text.size = args[6];
            text.show_immediately = args[7];
        } else {
            text.content = content;
            text.x1 = args[1];
            text.y1 = args[2];
            text.color = args[3];
            text.size = args[4];
        }
    }

    visitText_off(text_off) {

    }

    visitWaitkey(waitkey) {

    }

    visitTitle(title) {
        let args = splitParameter(this.command, "#title ");
        title['content'] = args[0];
    }

    visitTitle_dsp(title_dsp) {

    }

    visitChara(chara) {
        let args = splitParameter(this.command, "#chara ");
        chara['charaID'] = [];
        chara['filename'] = [];
        chara['position'] = [];
        chara['layer'] = [];
        //use array to save the parameters
        for (let i = 0; i < args.length - 1; i += 4) {
            chara['charaID'].push(args[i]);
            chara['filename'].push(args[i + 1]);
            chara['position'].push(args[i + 2]);
            chara['layer'].push(args[i + 3]);
        }
        chara['time'] = args[args.length - 1];
    }

    visitChara_cls(chara_cls) {
        let args = splitParameter(this.command, "#chara_cls ");
        if (args < 2) {
            chara_cls['charaID'] = args[0];
            chara_cls['time'] = 300;
        } else {
            chara_cls['charaID'] = args[0];
            chara_cls['time'] = args[1];
        }
    }

    visitChara_pos(chara_pos) {
        let args = splitParameter(this.command, "#chara_pos ");
        // append args if noncomplete
        if (args.length === 2) {
            args.push('0');
            args.push('5');
        }
        chara_pos['charaID'] = args[0];
        chara_pos['new_x'] = args[1];
        chara_pos['new_y'] = args[2];
        chara_pos['coord_mode'] = args[3];
    }

    visitBg(bg) {
        let args = splitParameter(this.command, "#bg ");
        switch (args.length) {
            case 5:
                bg['y'] = args[4];
            case 4:
                bg['x'] = args[3];
            case 3:
                bg['time'] = args[2];
            case 2:
                bg['transition'] = args[1];
            case 1:
                bg['filename'] = args[0];
        }
        if (!bg['y']) {
            bg['y'] = '0'
        }
        if (!bg['x']) {
            bg['x'] = '0'
        }
        if (!bg['time']) {
            bg['time'] = '300'
        }
        if (!bg['transition']) {
            bg['transition'] = 'BG_ALPHA'
        }
    }

    visitFlash(flash) {
        let args = splitParameter(this.command, "#flash ");
        if (args.length === 1) {
            args.push('0');
        }
        flash['color'] = args[0];
        flash['time'] = args[1];
    }

    visitQuake(quake) {

    }

    visitFade_out(fade_out) {
        let args = splitParameter(this.command, "#fade_out ");
        //todo: compatible-mode the original code is implemented like this,
        // but in the documentation it should be args[0] for color and 1 for time
        if (isNumber(args[0])) {
            //0 for time, 1 for color
            if (args[1] === 'FADE_WHITE') {
                args[1] = '#ffffff'
            } else if (args[1] === 'FADE_BLACK') {
                args[1] = '#000000'
            }
            fade_out['color'] = args[1];
            fade_out['time'] = args[0];
        } else {
            //1 for time, 0 for color
            if (args[0] === 'FADE_WHITE') {
                args[0] = '#ffffff'
            } else if (args[0] === 'FADE_BLACK') {
                args[0] = '#000000'
            }
            fade_out['color'] = args[0];
            fade_out['time'] = args[1];
        }
    }

    visitFade_in(fade_in) {
        let args = splitParameter(this.command, "#fade_in ");
        if (args.length < 1) {
            fade_in['time'] = 300;
        } else {
            fade_in['time'] = args[0];
        }
    }

    visitMovie(movie) {
        let args = splitParameter(this.command, "#movie ");
        movie['filename'] = args[0];
    }

    visitTextbox(textbox) {
        let args = splitParameter(this.command, "#textbox ");
        textbox['message'] = args[0];
        textbox['name'] = args[1];
    }

    visitChara_quake(chara_quake) {
        let args = splitParameter(this.command, "#chara_quake ");
        chara_quake['charaID'] = args;
    }

    visitChara_down(chara_down) {
        let args = splitParameter(this.command, "#chara_down ");
        chara_down['charaID'] = args;
    }

    visitChara_up(chara_up) {
        let args = splitParameter(this.command, "#chara_up ");
        chara_up['charaID'] = args;
    }

    visitScroll(scroll) {
        let args = splitParameter(this.command, "#scroll ");
        //todo: care about gameconfig['cgprefix']?
        scroll['filename'] = args[0];
        scroll['startx'] = args[1];
        scroll['starty'] = args[2];
        scroll['endx'] = args[3];
        scroll['endy'] = args[4];
        scroll['time'] = args[5];
    }

    visitChara_y(chara_y) {
        let args = splitParameter(this.command, "#chara_y ");
        chara_y['coord_mode'] = args[0];
        chara_y['charaID'] = [];
        chara_y['filename'] = [];
        chara_y['x'] = [];
        chara_y['y'] = [];
        chara_y['layer'] = [];
        //use array to save the parameters
        for (let i = 1; i < args.length - 1; i += 5) {
            chara_y['charaID'].push(args[i]);
            chara_y['filename'].push(args[i + 1]);
            chara_y['x'].push(args[i + 2]);
            chara_y['y'].push(args[i + 3]);
            chara_y['layer'].push(args[i + 4]);
        }
        chara_y['time'] = args[args.length - 1];
    }

    //can't simplify, because of cache.
    visitChara_scroll(chara_scroll) {
        let args = splitParameter(this.command, "#chara_scroll ");
        if (args.length === 10) {
            chara_scroll['coord_mode'] = args[0];
            chara_scroll['charaID'] = args[1];
            chara_scroll['filename'] = args[2];
            chara_scroll['startx'] = args[3];
            chara_scroll['starty'] = args[4];
            chara_scroll['endx'] = args[5];
            chara_scroll['endy'] = args[6];
            chara_scroll['beginalpha'] = args[7];
            chara_scroll['layer'] = args[8];
            chara_scroll['time'] = args[9];
        } else {
            chara_scroll['coord_mode'] = args[0];
            chara_scroll['charaID'] = args[1];
            chara_scroll['endx'] = args[2];
            chara_scroll['endy'] = args[3];
            chara_scroll['time'] = args[4];
        }
    }

    visitAnime_on(anime_on) {

        let args = splitParameter(this.command, "#anime_on ");
        anime_on['num'] = args[0];
        anime_on['filename'] = args[1];
        anime_on['x'] = args[2];
        anime_on['y'] = args[3];
        anime_on['interval'] = args[4];
        anime_on['isloop'] = args[5];
    }

    visitAnime_off(anime_off) {
        let args = splitParameter(this.command, "#anime_off ");
        if (args.length === 1) {
            anime_off['filename'] = args[0];
        }
    }

    visitChara_anime(chara_anime) {
        let args = splitParameter(this.command, "#chara_anime ");
        chara_anime['charaID'] = args[0];
        chara_anime['period'] = args[1];
        chara_anime['loop_num'] = args[2];
        chara_anime['offset_x'] = [];
        chara_anime['offset_y'] = [];
        //use array to save the parameters
        for (let i = 3; i < args.length; i += 2) {
            chara_anime['offset_x'].push(args[i]);
            chara_anime['offset_y'].push(args[i + 1]);
        }
    }

    visitSet(set) {
        let args = splitParameter(this.command, "#set ");
        set['var_name'] = args[0];
        if (isNumber(args[1])) {
            args[1] = parseInt(args[1], 10);
        }
        set['var_value'] = args[1];
    }

    visitAdd(add) {
        let args = splitParameter(this.command, "#add ");
        add['var_name'] = args[0];
        if (isNumber(args[1])) {
            args[1] = parseInt(args[1], 10);
        }
        add['add_value'] = args[1];
    }

    visitSub(sub) {
        let args = splitParameter(this.command, "#sub ");
        sub['var_name'] = args[0];
        if (isNumber(args[1])) {
            args[1] = parseInt(args[1], 10);
        }
        sub['sub_value'] = args[1];
    }

    visitLabel(label) {
        let args = splitParameter(this.command, "#label ");
        label['label_name'] = args[0];
    }

    visitGoto(goto) {
        let args = splitParameter(this.command, "#goto ");
        goto['label_name'] = args[0];
    }

    visitIf___goto(if___goto) {
        let args = splitParameter(this.command, "#if ");
        if___goto['condition'] = args[0];
        let goto = splitParameter(args[1], "goto ");
        if___goto['label_name'] = goto[0];
    }

    visitChange(change) {
        let args = splitParameter(this.command, "#change ");
        change['filename'] = args[0];
    }

    visitCall(call) {
        let args = splitParameter(this.command, "#call ");
        call['filename'] = args[0];
    }

    visitRet(ret) {

    }

    visitSel(sel) {
        let commands = this.command.split('\n');
        let args = splitParameter(commands[0], "#sel ");
        if (args.length === 1) {
            args.push('HINT_NONE')
        }
        sel['hint_pic'] = args[1];
        let i = parseInt(args[0], 10);
        sel['choice_num'] = i;
        let choices = [];
        for (let j = 1; j < i + 1; j++) {
            let line = commands[j];
            choices.push(delBlank(line));
        }
        sel['choices'] = choices;
    }

    visitSelect_text(select_text) {
        let args = splitParameter(this.command, "#select_text ");
        let num = parseInt(args[0], 10);
        select_text['choice_num'] = num;
        select_text['choice_text'] = [];
        select_text['x1'] = args[num + 1];
        select_text['y1'] = args[num + 2];
        select_text['x2'] = args[num + 3];
        select_text['y2'] = args[num + 4];
        select_text['color'] = args[num + 5];
        select_text['init_position'] = args[num + 6];
        for (let j = 1; j < num + 1; j++) {
            select_text['choice_text'].push(args[j]);
        }
    }

    visitSelect_var(select_var) {
        let args = splitParameter(this.command, "#select_var ");
        let num = parseInt(args[0], 10);
        select_var['choice_num'] = num;
        select_var['choice_text'] = [];
        select_var['var'] = [];
        select_var['x1'] = args[num * 2 + 1];
        select_var['y1'] = args[num * 2 + 2];
        select_var['x2'] = args[num * 2 + 3];
        select_var['y2'] = args[num * 2 + 4];
        select_var['color'] = args[num * 2 + 5];
        select_var['init_position'] = args[num * 2 + 6];
        for (let j = 1; j < num * 2; j += 2) {
            select_var['choice_text'].push(args[j]);
            select_var['var'].push(args[j + 1]);
        }
    }

    visitSelect_img(select_img) {
        let args = splitParameter(this.command, "#select_img ");
        let num = parseInt(args[0], 10);
        select_img['choice_num'] = num;
        select_img['filename'] = args[1];
        select_img['x'] = [];
        select_img['y'] = [];
        select_img['var'] = [];
        for (let j = 2; j < num * 3; j += 3) {
            select_img['x'].push(args[j]);
            select_img['y'].push(args[j + 1]);
            select_img['var'].push(args[j + 2]);
        }
        select_img['init_position'] = args[num * 3 + 2];
    }

    visitSelect_imgs(select_imgs) {
        let args = splitParameter(this.command, "#select_imgs ");
        let num = parseInt(args[0], 10);
        select_imgs['choice_num'] = num;
        select_imgs['filename'] = [];
        select_imgs['x'] = [];
        select_imgs['y'] = [];
        select_imgs['var'] = [];
        for (let j = 1; j < num * 4; j += 4) {
            select_imgs['filename'].push(args[j]);
            select_imgs['x'].push(args[j + 1]);
            select_imgs['y'].push(args[j + 2]);
            select_imgs['var'].push(args[j + 3]);
        }
        select_imgs['init_position'] = args[num * 4 + 1];
    }

    visitWait(wait) {
        let args = splitParameter(this.command, "#wait ");
        wait['time'] = args[0];
    }

    visitWait_se(wait_se) {

    }

    visitRand(rand) {
        let args = splitParameter(this.command, "#rand ");
        rand['var_name'] = args[0];
        rand['min_value'] = args[1];
        rand['max_value'] = args[2];
    }

    visitBgm(bgm) {
        let args = splitParameter(this.command, "#bgm ");
        if (args.length > 1) {
            bgm['isloop'] = args[1]
        } else {
            bgm['isloop'] = '0'
        }
        bgm['filename'] = args[0];
    }

    visitBgm_stop(bgm_stop) {
        //nothing to do
    }

    visitSe(se) {
        let args = splitParameter(this.command, "#se ");
        if (args.length > 1) {
            se['isloop'] = args[1]
        } else {
            se['isloop'] = '0'
        }
        se['filename'] = args[0];
    }

    visitSe_stop(se_stop) {
        //nothing to do
    }

    visitVo(vo) {
        let args = splitParameter(this.command, "#se ");
        vo['filename'] = args[0];
    }

    visitLoad(load) {
        //todo:else
        if (this.command.startsWith('#load ')) {
            let args = splitParameter(this.command, "#load ");
            if (args.length > 0) {
                load['save_num'] = args[0];
            }
        }
    }

    visitAlbum(album) {
        //todo:else
        if (this.command.startsWith('#album ')) {
            let args = splitParameter(this.command, "#album ");
            if (args.length > 0) {
                album['album_list_filename'] = args[0];
            }
        }
    }

    visitMusic(music) {

    }

    visitDate(date) {
        let args = splitParameter(this.command, "#date ");
        date['date_bg'] = args[0];
        date['x'] = args[1];
        date['y'] = args[2];
        date['color'] = args[3];
    }

    visitConfig(config) {

    }

    visitArrayInstruction(arrayInstruction) {
        let commands = this.command.split("\n");
        for (let i = 0; i < commands.length; i++) {
            let instruction = arrayInstruction.instructionArray[i];
            this.command = commands[i];
            instruction.accept(this);
        }
    }


}
