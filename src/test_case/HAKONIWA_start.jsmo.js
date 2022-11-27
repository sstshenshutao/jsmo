let script = "#label sai\n" +
    "#bg biaoti\n" +
    "#bgm 02\n" +
    "\n" +
    "#select_text 4,start,load,config,end,50,50,50,100,#FFFFFF,1\n" +
    "#if FSEL=0,goto start\n" +
    "#if FSEL=1,goto load\n" +
    "#if FSEL=2,goto config\n" +
    "#if FSEL=3,goto end\n" +
    "\n" +
    "#label start\n" +
    "#change first\n" +
    "#goto sai\n" +
    "\n" +
    "#label load\n" +
    "#load\n" +
    "#goto sai\n" +
    "\n" +
    "#label config\n" +
    "#config\n" +
    "#goto sai\n" +
    "\n" +
    "#label end";
export default script;
