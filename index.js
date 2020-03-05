//创建AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

//创建AnalyserNode
const analyser = ctx.createAnalyser();
analyser.fftSize = 128;

//获取audio节点
const audio = document.getElementsByClassName("gmc-music")[0];

//创建音频源
const source = ctx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(ctx.destination);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

//canvas绘制
var canvas = document.getElementsByClassName("gmc-musicEffect")[0];
var ctx2D = canvas.getContext("2d");

function defaultEffect(){
    for(var i=0,x=0;i<bufferLength;i++){
        ctx2D.fillStyle = "#fd8026";
        ctx2D.fillRect(x, 22, 1, 1);
        ctx2D.fillStyle = "#fd8026";
        ctx2D.fillRect(x, 22-1, 1, 1);
        x = x + 2;
    }
}
defaultEffect();
//音乐动效计时器
var musicEffectInterval; 

//启动 musicEffectInterval 函数
function beginEffect(){
    //动效每50ms绘制一次
    musicEffect = setInterval(() => {
        ctx2D.clearRect(0, 0, 100, 40);
        analyser.getByteFrequencyData(dataArray);

        //遍历dataArray数组
        for(var i=0,x=0;i<bufferLength;i++){
            ctx2D.fillStyle = "#fd8026";
            ctx2D.fillRect(x, 20, 1, dataArray[i]/16);
            ctx2D.fillStyle = "#fd8026";
            ctx2D.fillRect(x, 20-dataArray[i]/16, 1, dataArray[i]/16);

            x = x + 2;
        }
    }, 25);
}

//播放、暂停状态标志
var flag = false;

//播放、暂停按钮
var playOrStop = document.getElementsByClassName("gmc-playOrStopButton")[0];

//audio标签
var music = document.getElementsByClassName("gmc-music")[0];

//进度条指针(圆点)
var pointer = document.getElementsByClassName("gpb-pointer")[0];

//指针最小值、指针最大值
var minPointer=-5, maxPointer=70;

//检查进度计时器
var pointerInterval;

//歌词字幕
var lyricsText = 
[
    [4, "<span class='ani-1'>制作人</span> 蔡近翰Zoe <br/>"+
        "<span class='ani-2'><span class='ani-1'>视觉设计</span> 浩子</span>", "Music By HOYO-MIX"],
    [8, "<span class=' ani-1-2'>TIA袁娅维</span>", "<span class='ani-1-1'>StarFall</span>"],
    [12.0, "我眼中闪烁的并不是午夜的月光","What is reflected in my eyes? Not the moonlight in a starless midnight"],
    [18.2, "投射在熙攘人群身上", "that showers on the people passing by."],
    [24.72, "个体如此渺小，世界如此宽广", "One's so small and the world's so wide,"],
    [27.8, "每向前一步都似一声叹息", "every step forward echoes a sigh,"],
    [31.56, "我伸手向着遥远的光亮", "I reach out for the halo far up high."],
    [37.1, "脑海深处的记忆，沉默着却从未被遗忘", "Deeply engraved, my memory is silent but not forgotten indeed,"],
    [43.97, "有人已离开，声音却在脑海中回响", "someone has gone but a voice within me."],
    [49.95, "这具躯体已不再脆弱一旦回忆起其中刻下的所有经历", "Once I remember all the tales written inside this corp no more frail,"],
    [56.75, "我便会追寻曾经的信念", "I'll follow what my heart used to believe."],
    [63.18, "撞向人群上方的障壁", "Crash against the barrier above the crowd,"],
    [71.6, "碎片穿过大气燃烧成流星雨", "Flaring up pieces in the air to show a fairy starfall."],
    [76, "我不需要未来或过去", "I want no tomorrow or yesterday."],
    [84, "这些星光不会熄灭，直至破晓", "These sparkles shine and never fade till the break of day."],
    [92,"", ""],
    [103.69, "脑海深处的记忆，沉默着却从未被遗忘", "Deeply engraved, my memory is silent but not forgotten indeed,"],
    [110.46, "有人已离开，声音却在脑海中回响", "someone has gone but a voice within me."],
    [116.05, "这具躯体已不再脆弱一旦回忆起其中刻下的所有经历", "Once I remember all the tales written inside this corp no more frail,"],
    [123, "我便会追寻曾经的信念", "I'll follow what my heart used to believe."],
    [129.55, "撞向人群上方的障壁", "Crash against the barrier above the crowd,"],
    [137.9, "碎片穿过大气燃烧成流星雨", "Flaring up pieces in the air to show a fairy starfall."],
    [142.2, "我不需要未来或过去", "I want no tomorrow or yesterday."],
    [150.35, "这些星光不会熄灭，直至破晓", "These sparkles shine and never fade till the break of day."],
    [155, "撞向人群上方的障壁", "Crash against the barrier above the crowd,"],
    [162.6, "碎片穿过大气燃烧成流星雨", "Flaring up pieces in the air to show a fairy starfall."],
    [167.77, "我不需要未来或过去", "I want no tomorrow or yesterday."],
    [175.82, "这些星光不会熄灭，直至破晓", "These sparkles shine and never fade till the break of day."]
]
var param=0;
//中英文歌词字幕显示区域
var lyricsTextEN = document.getElementsByClassName("gl-en")[0];
var lyricsTextCN = document.getElementsByClassName("gl-cn")[0];

//音乐播放、暂停(图标变换)
playOrStop.onclick = function(){
    if(flag == false){
        playOrStop.style.backgroundImage = "url('./source/stop.png')";
        ctx.resume();
        music.play();
        //启动音乐动效
        beginEffect();

        //#音乐进度条(每250毫秒检测并移动pointer
        pointerInterval = setInterval(() => {
            pointer.style.left = minPointer + 
                                ((music.currentTime/music.duration).toFixed(3)*maxPointer) + 
                                "px";
            //显示歌词
            if(music.currentTime > lyricsText[param][0] && param < lyricsText.length-1){
                lyricsTextEN.innerHTML = lyricsText[param][2];
                lyricsTextCN.innerHTML = lyricsText[param][1];
                param++;
            }
            //是否结束
            if(music.ended == true){
                playOrStop.style.backgroundImage = "url('./source/play.png')";
                param = 0;
                clearInterval(pointerInterval);
                clearInterval(musicEffectInterval);
                flag = false;
            }
        }, 250);

        flag = true;
    }else{
        playOrStop.style.backgroundImage = "url('./source/play.png')";
        music.pause();

        //停止
        clearInterval(pointerInterval);
        clearInterval(musicEffectInterval);
        flag = false;
    }
}








