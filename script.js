const missions={

1:"ウォーデンを倒す",
2:"エメラルドを入手",
3:"木材を入手",
4:"ファミチキを買う",
5:"ダイヤを入手",
6:"鉄16個",
7:"金リンゴ作成",
8:"ネザーへ行く",
9:"エンダーパール入手",
10:"村発見",
11:"オオカミを仲間にする",
12:"ネコを仲間にする",
13:"馬に乗る",
14:"魚を釣る",
15:"パン作成",
16:"ケーキ作成",
17:"ベッドで寝る",
18:"ブレイズロッド入手",
19:"ポーション作成",
20:"ビーコン設置",
21:"レッドストーン回路",
22:"TNT爆発",
23:"クロスボウ作成",
24:"盾作成",
25:"ダイヤ装備",
26:"ネザライト装備",
27:"エンダードラゴン討伐",
28:"ウィザー召喚",
29:"村人と取引",
30:"コンパス作成",
31:"時計作成",
32:"ボート100m",
33:"雪玉を投げる",
34:"羊毛16個",
35:"ハチミツ入手",
36:"盾で防御",
37:"エリトラ入手",
38:"花火作成",
39:"スニッファー発見",
40:"ラクダに乗る",
41:"腕立て10回",
42:"水を飲む",
43:"テキーラショット",
44:"アレイを仲間にする",
45:"クリーパー！と叫ぶ",
46:"不死のトーテムを入手",
47:"クマノミを釣る",
48:"エンチャント系を釣る",
49:"スポンジ入手",
50:"モブのモノマネ"

};

const bingo=document.getElementById("bingo");

const clickSound = new Audio("click.mp3");

document.getElementById("generate").onclick=createCard;

function createCard(){

    bingo.innerHTML = "";

    let nums = [];

    // FREEマスがあるため24個だけ選ぶ
    while(nums.length < 24){

        let n = Math.floor(Math.random() * 50) + 1;

        if(!nums.includes(n)){
            nums.push(n);
        }

    }

    let numIndex = 0;

    // 5×5のカードを作成
    for(let i = 0; i < 25; i++){

        const cell = document.createElement("div");

        // 真ん中（3行3列目）はFREE
        if(i === 12){

            cell.className = "cell checked free";
            cell.innerHTML = "<div><b>FREE</b></div>";

        }else{

            const n = nums[numIndex++];

            cell.className = "cell";

            cell.innerHTML = `
                <div>
                    <b>${n}</b><br>
                    ${missions[n]}
                </div>
            `;

            cell.onclick = () => {

                cell.classList.toggle("checked");

                checkBingo();

            };

        }

        bingo.appendChild(cell);

    }

}

function checkBingo(){

    const cells = [...document.querySelectorAll(".cell")];

    const c = i => cells[i].classList.contains("checked");

    let bingoLines = [];

    // 横
    for(let y = 0; y < 5; y++){

        let line = [];

        for(let x = 0; x < 5; x++){
            line.push(y * 5 + x);
        }

        if(line.every(c)) bingoLines.push(line);
    }

    // 縦
    for(let x = 0; x < 5; x++){

        let line = [];

        for(let y = 0; y < 5; y++){
            line.push(y * 5 + x);
        }

        if(line.every(c)) bingoLines.push(line);
    }

    // 斜め
    const diag1 = [0,6,12,18,24];
    const diag2 = [4,8,12,16,20];

    if(diag1.every(c)) bingoLines.push(diag1);
    if(diag2.every(c)) bingoLines.push(diag2);

    // ラインを光らせる
    bingoLines.forEach(line => {

        line.forEach(i => {
            cells[i].classList.add("bingo-line");
        });

    });

    // ビンゴ通知
    if(bingoLines.length > 0){

        setTimeout(() => {
            alert("🎉 ビンゴ達成！！");
        }, 200);

    }

}

cell.onclick = () => {

    clickSound.currentTime = 0;
    clickSound.play();

    cell.classList.toggle("checked");

    checkBingo();

};