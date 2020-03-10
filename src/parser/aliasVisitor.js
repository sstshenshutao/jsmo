import {ParseVisitor} from "./instructionVisitor.js";

function replaceAlias(alias, proto, command) {
    return proto + command.slice(alias.length);
}

function parseCspPosition(pos) {
    switch (pos) {
        case 'CHR_LEFT':
            return '25';
        case 'CHR_RIGHT':
            return '75';
        case 'CHR_CENTER':
            return '50';
    }
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

export class AliasVisitor extends ParseVisitor {

    constructor() {
        super();
    }

    visitTestSay(testSay) {
        this.command = replaceAlias("#testSay", "#say", this.command);
        this.visitSay(testSay);
        console.log(testSay);
    }

    visitSst(sst) {
        this.command = replaceAlias("#sst", "#se_stop", this.command);
        this.visitSe_stop(sst);
    }

    visitWoff(woff) {
        this.command = replaceAlias("#woff", "#se_stop", this.command);
        this.visitSe_stop(woff);
    }

    visitEff(eff) {
        this.command = replaceAlias("#eff", "#se", this.command);
        this.visitSe(eff);
    }

    visitSE_PLY(sE_PLY) {
        this.command = replaceAlias("#;\tSE_PLY", "#se", this.command);
        this.visitSe(sE_PLY);
    }

    visitMst(mst) {
        this.command = replaceAlias("#mst", "#bgm_stop", this.command);
        this.visitBgm_stop(mst);
    }

    visitCsp(csp) {
        // change csp to chara Instruction
        // 9: "#csp 0,YU07AA,CHR_CENTER,   : charaID, filename, (needToParse)position
        // #chara charaID1,filename1,position1(%),layer1,time
        //those default values got from 'CHADisp'
        let layer = 1;
        let time = 300;
        let args = splitParameter(this.command, '#csp ');
        this.command = `#chara ${args[0]},${args[1]},${parseCspPosition(args[2])},${layer},${time}`
        // console.log(this.command);
        this.visitChara(csp)
    }

    visitCrs(crs) {
        let time = 300;
        let args = splitParameter(this.command, '#crs ');
        this.command = `#chara ${args[0]},NULL,0,0,${time}`;
        this.visitChara(crs)
    }

    visitBgtime(bgtime) {
        //# bgtime filename, delay_time
        // convert into :
        // #bg filename, 'BG_ALPHA', 'BG_SLOW'
        // + #waittime delay_time
        let args = splitParameter(this.command, '#bgtime ');
        let filename = args[0];
        let delayTime = args[1];
        let bgCommand = `#bg ${filename}, 'BG_ALPHA', 'BG_SLOW'`;
        let waittimeCommand = `#waittime ${delayTime}`;
        this.command = `${waittimeCommand}\n${bgCommand}`;
        this.visitArrayInstruction(bgtime);
    }

    visitWaittime(waittime) {
        let args = splitParameter(this.command, '#waittime ');
        waittime['delay_time'] = args[0];
    }

    visitEnd(end) {
        this.command = replaceAlias("#end", "#change", this.command);
        this.visitChange(end);
    }

    visitFade_out_sta(fade_out_sta) {
        this.command = replaceAlias("#fade_out_sta", "#fade_out", this.command);
        this.visitFade_out(fade_out_sta);
    }
}
