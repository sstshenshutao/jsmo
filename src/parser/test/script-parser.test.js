import ScriptParser from "../script-parser";
import example_json from '../../test_case/example.jsmo.js'
import { describe, expect, test } from '@jest/globals';

function readFromTestCase(noob) {
    let scriptBuffer = undefined;
    let scriptIndex = 0;
    let data = noob;
    return new Promise((resolve, reject) => {
        scriptBuffer = data;
        scriptIndex = 0;
        scriptBuffer = scriptBuffer.split('\n');
        resolve({ scriptBuffer, scriptIndex });
    })
}

describe('test ScriptParser class', () => {
    test('examples', async () => {
        let example = await readFromTestCase(example_json);
        let sp = new ScriptParser(example.scriptBuffer, example.scriptIndex);
        let instructions = sp.parseNextCommands(10);
        expect(instructions.length).toBe(10);
        //         Say { name: '智也', content: '「…久等了……」' }, 
        expect(instructions[0].constructor.name).toBe("Say");
        expect(instructions[0].name).toBe("智也");
        expect(instructions[0].content).toBe("「…久等了……」");
        // Say { content: '她⽤甜甜的笑脸，\\n回应着我的话。' },
        expect(instructions[1].constructor.name).toBe("Say");
        expect(instructions[1].content).toBe("她⽤甜甜的笑脸，\\n回应着我的话。");
        // Text {
        //   content: '第⼀章',
        //   x1: '10',
        //   y1: '10',
        //   x2: '50',
        //   y2: '50',
        //   color: '#FF0000',
        //   size: '16',
        //   show_immediately: '1'
        // },
        expect(instructions[2].constructor.name).toBe("Text");
        expect(instructions[2].content).toBe("第⼀章");
        expect(instructions[2].x1).toBe("10");
        expect(instructions[2].y1).toBe("10");
        expect(instructions[2].x2).toBe("50");
        expect(instructions[2].y2).toBe("50");
        expect(instructions[2].color).toBe("#FF0000");
        expect(instructions[2].size).toBe("16");
        expect(instructions[2].show_immediately).toBe("1");
        // Text {
        //     content: 'F12',
        //     x1: '10',
        //     y1: '10',
        //     x2: '50',
        //     y2: '50',
        //     color: '#FF0000',
        //     size: '16',
        //     show_immediately: '0'
        //   },
        expect(instructions[3].constructor.name).toBe("Text");
        expect(instructions[3].content).toBe("F12");
        expect(instructions[3].x1).toBe("10");
        expect(instructions[3].y1).toBe("10");
        expect(instructions[3].x2).toBe("50");
        expect(instructions[3].y2).toBe("50");
        expect(instructions[3].color).toBe("#FF0000");
        expect(instructions[3].size).toBe("16");
        expect(instructions[3].show_immediately).toBe("0");
        // Text_off {},
        expect(instructions[4].constructor.name).toBe("Text_off");
        // Waitkey {},
        expect(instructions[5].constructor.name).toBe("Waitkey");
        // Title { content: '序章' },
        expect(instructions[6].constructor.name).toBe("Title");
        expect(instructions[6].content).toBe("序章");
        // Title_dsp {},
        expect(instructions[7].constructor.name).toBe("Title_dsp");
        // Chara {
        //     charaID: [ '0' ],
        //     filename: [ 'SM02AMA' ],
        //     position: [ '25' ],
        //     layer: [ '0' ],
        //     time: '400'
        //   },
        expect(instructions[8].constructor.name).toBe("Chara");
        expect(instructions[8].charaID).toEqual(["0"]);
        expect(instructions[8].filename).toEqual(["SM02AMA"]);
        expect(instructions[8].position).toEqual(["25"]);
        expect(instructions[8].layer).toEqual(["0"]);
        expect(instructions[8].time).toBe("400");
        // Chara {
        //     charaID: [ '0', '1' ],
        //     filename: [ 'SM02AMA', 'SN01AMA' ],
        //     position: [ '25', '75' ],
        //     layer: [ '1', '2' ],
        //     time: '500'
        //   }
        expect(instructions[9].constructor.name).toBe("Chara");
        expect(instructions[9].charaID).toEqual(["0", "1"]);
        expect(instructions[9].filename).toEqual(["SM02AMA", "SN01AMA"]);
        expect(instructions[9].position).toEqual(["25", "75"]);
        expect(instructions[9].layer).toEqual(["1", "2"]);
        expect(instructions[9].time).toBe("500");
    });
});
