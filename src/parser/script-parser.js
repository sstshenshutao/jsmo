import {
    Add,
    Album,
    Anime_off,
    Anime_on,
    Bg,
    Bgm,
    Bgm_stop,
    Call,
    Change,
    Chara,
    Chara_anime,
    Chara_cls,
    Chara_down,
    Chara_pos,
    Chara_quake,
    Chara_scroll,
    Chara_up,
    Chara_y,
    Config,
    Date,
    Fade_in,
    Fade_out,
    Flash,
    Goto,
    If___goto,
    Label,
    Load,
    Movie,
    Music,
    Quake,
    Rand,
    Ret,
    Say,
    Scroll,
    Se,
    Se_stop,
    Sel,
    Select_img,
    Select_imgs,
    Select_text,
    Select_var,
    Set,
    Sub,
    Text,
    Text_off,
    Textbox,
    Title,
    Title_dsp,
    Vo,
    Wait,
    Wait_se,
    Waitkey
} from '../instruction.js';
import { ParseVisitor } from './instruction-visitor.js'
import { AliasVisitor } from "./alias-visitor.js";
import { Fade_out_sta, Waittime, Bgtime, Crs, Csp, Eff, Mst, SE_PLY, Sst, TestSay, Woff } from "./alias-instruction.js";

export default class ScriptParser {
    scriptBuffer = undefined; // all data from script
    scriptIndex = 0;   // current read pointer
    parseVisitor = new ParseVisitor();
    aliasVisitor = new AliasVisitor();

    constructor(scriptBuffer, scriptIndex) {
        this.scriptBuffer = scriptBuffer;
        this.scriptIndex = scriptIndex;
    }

    _readNextLine() {
        let ret = this.scriptBuffer[this.scriptIndex];
        this.scriptIndex++;
        return ret;
    }

    _nextCommand() {
        let nextLine = this._readNextLine();
        while (typeof nextLine !== 'undefined' && !isValid(nextLine)) {
            // console.log("nextCommand::nextline:", nextLine);
            nextLine = this._readNextLine();
        }
        function isValid(nextLine) {
            return nextLine.startsWith("#") || nextLine.startsWith(";\tSE_PLY");
        }
        return nextLine;
    }
    _handleAlias(command) {
        if (command.startsWith('#testSay')) {
            let ret = new TestSay();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#sst')) {
            let ret = new Sst();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#woff')) {
            let ret = new Woff();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#eff')) {
            let ret = new Eff();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith(';\tSE_PLY')) {
            let ret = new SE_PLY();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#mst')) {
            let ret = new Mst();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#csp')) {
            let ret = new Csp();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#crs')) {
            let ret = new Crs();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#bgtime')) {
            let ret = new Bgtime();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#fade_out_sta')) {
            let ret = new Fade_out_sta();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }
        if (command.startsWith('#waittime')) {
            let ret = new Waittime();
            this.aliasVisitor['command'] = command;
            ret.accept(this.aliasVisitor);
            return ret;
        }

        return undefined;
    }

    _parseCommand(command) {
        // handle the alias:
        // replace the alias to the normal Instructions: like sugar.
        // with inheritance-class: for future usage(transfer to another lang)
        let aliasCommand = this._handleAlias(command);
        if (aliasCommand) {
            return aliasCommand;
        }
        //those comparison can be speed up by using the dataStructure like prefix-tree
        if (command.startsWith('#say')) {
            let ret = new Say();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        //order
        if (command.startsWith('#textbox')) {
            let ret = new Textbox();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#text_off')) {
            let ret = new Text_off();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#text')) {
            let ret = new Text();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        //end_order
        if (command.startsWith('#waitkey')) {
            let ret = new Waitkey();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        //order
        if (command.startsWith('#title_dsp')) {
            let ret = new Title_dsp();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#title')) {
            let ret = new Title();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        //end_order
        //order
        if (command.startsWith('#chara_cls')) {
            let ret = new Chara_cls();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#chara_pos')) {
            let ret = new Chara_pos();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#chara_quake')) {
            let ret = new Chara_quake();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#chara_down')) {
            let ret = new Chara_down();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#chara_up')) {
            let ret = new Chara_up();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#chara_y')) {
            let ret = new Chara_y();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#chara_scroll')) {
            let ret = new Chara_scroll();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);

            return ret;
        }
        if (command.startsWith('#chara_anime')) {
            let ret = new Chara_anime();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#chara')) {
            let ret = new Chara();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        //end_order

        if (command.startsWith('#flash')) {
            let ret = new Flash();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#quake')) {
            let ret = new Quake();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#fade_out')) {
            let ret = new Fade_out();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#fade_in')) {
            let ret = new Fade_in();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#movie')) {
            let ret = new Movie();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }


        if (command.startsWith('#scroll')) {
            let ret = new Scroll();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }

        if (command.startsWith('#anime_on')) {
            let ret = new Anime_on();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);

            return ret;
        }
        if (command.startsWith('#anime_off')) {
            let ret = new Anime_off();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);

            return ret;
        }

        if (command.startsWith('#set')) {
            let ret = new Set();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#add')) {
            let ret = new Add();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#sub')) {
            let ret = new Sub();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#label')) {
            let ret = new Label();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#goto')) {
            let ret = new Goto();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#if')) {
            let ret = new If___goto();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#change')) {
            let ret = new Change();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#call')) {
            let ret = new Call();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#ret')) {
            let ret = new Ret();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        /**
         * this command is a multiple-lines command.
         * so it will call readNextLine, has a !side effect! on line-index
         */
        if (command.startsWith('#select_text')) {
            let ret = new Select_text();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#select_var')) {
            let ret = new Select_var();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#select_imgs')) {
            let ret = new Select_imgs();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#select_img')) {
            let ret = new Select_img();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }

        if (command.startsWith('#sel')) {
            let ret = new Sel();
            //read more lines ,combine command and parse again
            let args = splitParameter(command, "#sel ");
            let i = parseInt(args[0], 10);
            while (i > 0) {
                let line = readNextLine();
                command = command + '\n' + line;
                i -= 1;
            }
            //command combine finished, call visitor
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#wait_se')) {
            let ret = new Wait_se();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#wait')) {
            let ret = new Wait();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }

        if (command.startsWith('#rand')) {
            let ret = new Rand();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#bgm_stop')) {
            let ret = new Bgm_stop();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#bgm')) {
            let ret = new Bgm();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#bg')) {
            let ret = new Bg();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#se_stop')) {
            let ret = new Se_stop();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#se')) {
            let ret = new Se();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }

        if (command.startsWith('#vo')) {
            let ret = new Vo();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#load')) {
            let ret = new Load();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#album')) {
            let ret = new Album();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#music')) {
            let ret = new Music();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#date')) {
            let ret = new Date();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }
        if (command.startsWith('#config')) {
            let ret = new Config();
            this.parseVisitor['command'] = command;
            ret.accept(this.parseVisitor);
            return ret;
        }

        return undefined;


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
    }
    //sync function
    parseNextCommands(count) {
        function dictPush(dict, key) {
            if (!dict.includes(key)) {
                dict.push(key);
            }
        }
        let ret = [];
        let parseErrorInstructions = [];
        for (let i = 0; i < count; i++) {
            let command = this._nextCommand();
            if (!command) {
                break;
            }
            let instruction = this._parseCommand(command);
            if (!instruction) {
                console.log("parse-error: line " + scriptIndex + ' ' + command);
                dictPush(parseErrorInstructions, command);
            } else {
                ret.push(instruction);
            }
        }
        (parseErrorInstructions.length > 0) ?
            console.log("parseErrorInstructions:", parseErrorInstructions) :
            console.log("parseNextCommands: ", ret);
        return ret;
    }
}