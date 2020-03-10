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
} from './instruction.js';
import {ParseVisitor} from './instructionVisitor.js'
import {AliasVisitor} from "./aliasVisitor.js";
import {Fade_out_sta, Waittime, Bgtime, Crs, Csp, Eff, Mst, SE_PLY, Sst, TestSay, Woff} from "./aliasInstruction.js";
import example_json from './ParserTest/example.jsmo.js'
import HAKONIWA_first_json from './ParserTest/HAKONIWA_first.jsmo.js'
import HAKONIWA_start_json from './ParserTest/HAKONIWA_start.jsmo.js'

let scriptBuffer = undefined;
let scriptIndex = 0;

function changeScriptTestDouble(noob) {
    let data = noob;
    return new Promise((resolve, reject) => {
        scriptBuffer = data;
        scriptIndex = 0;
        scriptBuffer = scriptBuffer.split('\n');
        resolve("done");
    })
}


function readNextLine() {
    let ret = scriptBuffer[scriptIndex];
    scriptIndex++;
    return ret;
}

let parseVisitor = new ParseVisitor();
let aliasVisitor = new AliasVisitor();

function handleAlias(command) {

    if (command.startsWith('#testSay')) {
        let ret = new TestSay();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#sst')) {
        let ret = new Sst();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#woff')) {
        let ret = new Woff();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#eff')) {
        let ret = new Eff();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith(';\tSE_PLY')) {
        let ret = new SE_PLY();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#mst')) {
        let ret = new Mst();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#csp')) {
        let ret = new Csp();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#crs')) {
        let ret = new Crs();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#bgtime')) {
        let ret = new Bgtime();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#fade_out_sta')) {
        let ret = new Fade_out_sta();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }
    if (command.startsWith('#waittime')) {
        let ret = new Waittime();
        aliasVisitor['command'] = command;
        ret.accept(aliasVisitor);
        return ret;
    }

    return undefined;
}

function parseCommand(command) {
    // handle the alias:
    // replace the alias to the normal Instructions: like sugar.
    // with inheritance-class: for future usage(transfer to another lang)
    let aliasCommand = handleAlias(command);
    if (aliasCommand) {
        return aliasCommand;
    }
    //those comparison can be speed up by using the dataStructure like B-tree
    if (command.startsWith('#say')) {
        let ret = new Say();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    //order
    if (command.startsWith('#textbox')) {
        let ret = new Textbox();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#text_off')) {
        let ret = new Text_off();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#text')) {
        let ret = new Text();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    //end_order
    if (command.startsWith('#waitkey')) {
        let ret = new Waitkey();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    //order
    if (command.startsWith('#title_dsp')) {
        let ret = new Title_dsp();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#title')) {
        let ret = new Title();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    //end_order
    //order
    if (command.startsWith('#chara_cls')) {
        let ret = new Chara_cls();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#chara_pos')) {
        let ret = new Chara_pos();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#chara_quake')) {
        let ret = new Chara_quake();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#chara_down')) {
        let ret = new Chara_down();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#chara_up')) {
        let ret = new Chara_up();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#chara_y')) {
        let ret = new Chara_y();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#chara_scroll')) {
        let ret = new Chara_scroll();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);

        return ret;
    }
    if (command.startsWith('#chara_anime')) {
        let ret = new Chara_anime();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#chara')) {
        let ret = new Chara();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    //end_order

    if (command.startsWith('#flash')) {
        let ret = new Flash();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#quake')) {
        let ret = new Quake();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#fade_out')) {
        let ret = new Fade_out();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#fade_in')) {
        let ret = new Fade_in();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#movie')) {
        let ret = new Movie();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }


    if (command.startsWith('#scroll')) {
        let ret = new Scroll();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }

    if (command.startsWith('#anime_on')) {
        let ret = new Anime_on();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);

        return ret;
    }
    if (command.startsWith('#anime_off')) {
        let ret = new Anime_off();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);

        return ret;
    }

    if (command.startsWith('#set')) {
        let ret = new Set();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#add')) {
        let ret = new Add();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#sub')) {
        let ret = new Sub();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#label')) {
        let ret = new Label();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#goto')) {
        let ret = new Goto();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#if')) {
        let ret = new If___goto();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#change')) {
        let ret = new Change();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#call')) {
        let ret = new Call();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#ret')) {
        let ret = new Ret();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    /**
     * this command is a multiple-lines command.
     * so it will call readNextLine, has a !side effect! on line-index
     */
    if (command.startsWith('#select_text')) {
        let ret = new Select_text();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#select_var')) {
        let ret = new Select_var();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#select_imgs')) {
        let ret = new Select_imgs();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#select_img')) {
        let ret = new Select_img();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
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
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#wait_se')) {
        let ret = new Wait_se();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#wait')) {
        let ret = new Wait();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }

    if (command.startsWith('#rand')) {
        let ret = new Rand();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#bgm_stop')) {
        let ret = new Bgm_stop();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#bgm')) {
        let ret = new Bgm();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#bg')) {
        let ret = new Bg();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#se_stop')) {
        let ret = new Se_stop();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#se')) {
        let ret = new Se();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }

    if (command.startsWith('#vo')) {
        let ret = new Vo();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#load')) {
        let ret = new Load();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#album')) {
        let ret = new Album();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#music')) {
        let ret = new Music();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#date')) {
        let ret = new Date();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
        return ret;
    }
    if (command.startsWith('#config')) {
        let ret = new Config();
        parseVisitor['command'] = command;
        ret.accept(parseVisitor);
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

function dictPush(dict, key) {
    if (!dict.includes(key)) {
        dict.push(key);
    }
}

//sync function
function parseNextCommands(count) {
    let ret = [];
    let parseErrorInstructions = [];
    for (let i = 0; i < count; i++) {
        let command = nextCommand();
        if (!command) {
            break;
        }
        let instruction = parseCommand(command);
        if (!instruction) {
            console.log("parse-error: line " + scriptIndex + ' ' + command);
            dictPush(parseErrorInstructions, command);
        } else {
            ret.push(instruction);
        }
    }
    console.log("parseErrorInstructions:", parseErrorInstructions);
    return ret;

    function isValid(nextLine) {
        return nextLine.startsWith("#") || nextLine.startsWith(";\tSE_PLY");
    }

    function nextCommand() {
        let nextLine = readNextLine();
        while (typeof nextLine !== 'undefined' && !isValid(nextLine)) {
            // console.log("nextCommand::nextline:", nextLine);
            nextLine = readNextLine();
        }
        return nextLine;
    }

}

console.log("------------test example_json----------------------");
changeScriptTestDouble(example_json).then(() => {
    console.log(parseNextCommands(500))
    console.log("-------------test HAKONIWA_first_json---------------------");
    changeScriptTestDouble(HAKONIWA_first_json).then(() => {
        console.log(parseNextCommands(500))
        console.log("---------------test HAKONIWA_start_json------------");
        changeScriptTestDouble(HAKONIWA_start_json).then(() => {
            console.log(parseNextCommands(500))
        });
    });
});


export default parseNextCommands;
