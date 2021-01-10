//(c) Ger Versluis 2000 version 1.0, 1 november 2000

	var NoOffFirstLineMenus=5; //set number of main menu items
	var LowBgColor='#CC00CC';
	var HighBgColor='#ffccff';
	var FontLowColor='#ffffff';
	var FontHighColor='#CC3399';
	var BorderColor='#b1c5ea';
	var BorderWidth=1;
	var BorderBtwnElmnts=1;
	var FontFamily="arial,helvetica,sans-serif"
	var FontSize=10;
	var FontBold=1;
	var FontItalic=0;
	var MenuTextCentered=1;
	var MenuCentered='center';
	var MenuVerticalCentered='top';
	var ChildOverlap=0;
	var ChildVerticalOverlap=1;
	if (document.all) 
	{
		var StartTop=115; //set vertical offset
		var StartLeft=0; //set horizontal offset
	}
	else
	{
		var StartTop=108; //set vertical offset
		var StartLeft=0; //set horizontal offset
	}
	var VerCorrect=0;
	var HorCorrect=0;
	var LeftPaddng=0;
	var TopPaddng=2;
	var FirstLineHorizontal=1; //set menu layout (1=horizontal, 0=vertical)
	var MenuFramesVertical=1;
	var DissapearDelay=100;
	var TakeOverBgColor=1;
	var FirstLineFrame='self';
	var SecLineFrame='self';
	var DocTargetFrame='self';
	var WebMasterCheck=0;

//Menux=new Array("text to show","Link",No of sub elements,element height,element width);
//see accompanying "config.htm" file for more information on structure of menus

Menu1=new Array("Home",base_href + "/index.html",0,20,149);

Menu2=new Array("情報","",5);
	Menu2_1=new Array("ｻｳﾝﾄﾞｾﾗﾋﾟｰの基本原理",base_href + "/information/principle.html",0,20,149);
	Menu2_2=new Array("12音階のエネルギー",base_href + "/information/12tone.html",0);
	Menu2_3=new Array("脳波",base_href + "/information/brain_waves.html",0);
	Menu2_4=new Array("声のタイプ",base_href + "/information/voice_type.html",0);
	Menu2_5=new Array("音程の形而上学",base_href + "/information/intervals.html",0);

Menu3=new Array("ワークショップ",base_href + "/workshop/index.html",2,20,149);
	Menu3_1=new Array("スケジュール",base_href + "/workshop/schedule.html",0,20,149);
	Menu3_2=new Array("Module 1",base_href + "index.shtml",0);
	Menu3_3=new Array("Module 2",base_href + "index.shtml",0);

Menu4=new Array("製品","",3);
	Menu4_1=new Array("Sound Resonance CD",base_href + "index.shtml",0,20,180);
	Menu4_2=new Array("Sound Resonance Reader",base_href + "index.shtml",0);
	Menu4_3=new Array("Crystal Bowl",base_href + "index.shtml",0);

Menu5=new Array("その他",base_href + "index.shtml",0);

