let script = "say [name,] content\n" +
    "#say 智也,「…久等了……」\n" +
    "#say 她⽤甜甜的笑脸，\\n回应着我的话。\n" +
    "\n" +
    "text content, x1,y1,x2,y2,color,size, show_immediately\n" +
    "#text 第⼀章,10,10,50,50,#FF0000,16,1\n" +
    "#text F12,10,10,50,50,#FF0000,16,0\n" +
    "\n" +
    "#text_off\n" +
    "\n" +
    "#waitkey\n" +
    "\n" +
    "#title 序章\n" +
    "#title_dsp\n" +
    "\n" +
    "chara charaID1,filename1,position1,layer1[,charaID2,filename2,position2,\n" +
    "#chara 0,SM02AMA,25,0,400\n" +
    "#chara 0,SM02AMA,25,1,1,SN01AMA,75,2,500\n" +
    "#chara 0,SM02AMA,16,1,1,SN01AMA,50,2, 2,NULL,0,0,400\n" +
    "\n" +
    "chara_cls charaID,[time] \n" +
    "#chara_cls a\n" +
    "#chara_cls 0,500\n" +
    "\n" +
    "chara_pos charaID,new_x,new_y, coord_mode\n" +
    "#chara_pos 0,30,0,5\n" +
    "\n" +
    "bg filename[, transition,time[,x,y]]\n" +
    "#bg BG001_H\n" +
    "#bg BG001_H, BG_FADE, 500\n" +
    "#bg BG001_H, BG_FADE, 500, 10, 20\n" +
    "#bg BG001_H, trans_mask, 500\n" +
    "\n" +
    "flash color,time\n" +
    "#flash #FF0000,1000\n" +
    "\n" +
    "quake\n" +
    "#quake\n" +
    "\n" +
    "fade_out color,time\n" +
    "#fade_out #000000,1000\n" +
    "\n" +
    "fade_in time\n" +
    "#fade_in 1000 \n" +
    "\n" +
    "movie filename\n" +
    "#movie opening\n" +
    "\n" +
    "textbox message,name\n" +
    "#textbox message2,name2\n" +
    "\n" +
    "chara_quake charaID1, charaID2,……\n" +
    "#chara_quake 0\n" +
    "#chara_quake 0,1\n" +
    "\n" +
    "chara_down charaID1, charaID2,……\n" +
    "#chara_down 0\n" +
    "#chara_down 0,1 \n" +
    "\n" +
    "chara_up charaID1, charaID2,……\n" +
    "#chara_up 0\n" +
    "#chara_up 0,1\n" +
    "\n" +
    "scroll filename, startx, starty, endx, endy, time\n" +
    "#scroll B34a,0,0,50,0,10000\n" +
    "\n" +
    "chara_y coord_mode, charaID1,filename1,x1,y1,layer1 [,charaID2,filename2,x2,y2,\n" +
    "#chara_y 1,0,SM02AMA,25,10,0,400\n" +
    "#chara_y 0, 0,SM02AMA,25,20,1, 1,SN01AMA,75,10,2,500\n" +
    "\n" +
    "chara_scroll coord_mode, charaID, filename, startx, starty, endx, endy,\n" +
    "chara_scroll coord_mode, charaID, endx, endy, time\n" +
    "#chara_scroll 5,0,SM02AMA,0,0,50,0,130,1,400\n" +
    "#chara_scroll 5,0,100,0, 400\n" +
    "\n" +
    "#anime_on 3,rain,0,0,300,1\n" +
    "\n" +
    "anime_off filename\n" +
    "#anime_off rain\n" +
    "\n" +
    "chara_anime charaID, period, loop_num, offset_x1, offset_y1, offset_x2, offset_y2,\n" +
    "#chara_anime 1, 100, 2, 0,7, 0,16, 0,12, 0,16, 0,7, 0,0\n" +
    "\n" +
    "set var_name, var_value\n" +
    "#set F58,1\n" +
    "#set F58,FSEL\n" +
    "\n" +
    "add var_name, add_value\n" +
    "#add F11,1\n" +
    "#add F11,S1\n" +
    "\n" +
    "sub var_name, sub_value\n" +
    "#sub F11,1\n" +
    "#sub F11,S1\n" +
    "\n" +
    "label label_name \n" +
    "#label SEL_LABEL_1\n" +
    "\n" +
    "goto label_name\n" +
    "#goto SEL_LABEL_1\n" +
    "\n" +
    "if condition,goto label_name\n" +
    "#if F11=0, goto SEL_LABEL_0\n" +
    "#if F11>=S1, goto SEL_LABEL_1\n" +
    "\n" +
    "change filename\n" +
    "#change script_01 \n" +
    "\n" +
    "call filename\n" +
    "#call script_01\n" +
    "\n" +
    "ret\n" +
    "#ret\n" +
    "\n" +
    "sel choice_num[,hint_pic]\n" +
    "#sel 2\n" +
    "\n" +
    "select_text choice_num,choice_text_1, choice_text_2,…,x1,y1,x2,y2,color,\n" +
    "#select_text 3,开始游戏,继续游戏,退出, 0,50,100,100,#409900, 0\n" +
    "\n" +
    "select_var choice_num, choice_text_1, var1, choice_text_2, var2, … ,x1 ,y1 ,x2 ,y2 ,\n" +
    "#select_var 3,去教室,var0,去保健室,var1,退出,1, 0,50,100,100,#409900, 0 \n" +
    "\n" +
    "#select_img 4,button,50,40,var0,50,50,var1,50,60,var2,50,70,var3,0\n" +
    "\n" +
    "select_imgs choice_num, filename1, x1, y1, var1, filename2, x2 ,y2 , var2, … ,\n" +
    "#select_imgs 4,button0,50,40,var0,button1,50,50,var1,button2,50,60,var2,button3,50,70,var3,0\n" +
    "\n" +
    "wait time\n" +
    "#wait 2000\n" +
    "\n" +
    "wait_se\n" +
    "#wait_se\n" +
    "\n" +
    "rand var_name, min_value, max_value\n" +
    "#rand F11,0,3 \n" +
    "\n" +
    "bgm filename[,isloop]\n" +
    "#bgm BGM001\n" +
    "#bgm BGM002,1\n" +
    "\n" +
    "bgm_stop\n" +
    "#bgm_stop\n" +
    "\n" +
    "se filename[,isloop]\n" +
    "#se SE001\n" +
    "#se SE002,1\n" +
    "\n" +
    "#se_stop\n" +
    "\n" +
    "vo filename\n" +
    "#vo AY00001\n" +
    "\n" +
    "load [save_num]\n" +
    "#load\n" +
    "#load 0\n" +
    "\n" +
    "album [album_list_filename]\n" +
    "#album\n" +
    "#album album0\n" +
    "\n" +
    "music\n" +
    "#music\n" +
    "\n" +
    "date date_bg,x,y,color\n" +
    "#date EYE_D,65,42,#000000\n" +
    "\n" +
    "config\n" +
    "#config ";
export default script;
