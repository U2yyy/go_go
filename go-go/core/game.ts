
const backWidth = 30;
const backHeight = 30;

const itemWidth = 5;
const itemHeight = 6;

const img = [
    "../img/ak47.jpeg",
    "../img/awp.jpeg",
    "../img/eagle.jpeg",
    "../img/m4a1.jpeg",
    "../img/p250.jpeg",
    "../img/r8.jpeg",
    "../img/usp.jpeg"
]


export class ItemGame{
    private height: number;
    private width: number;
    private index: any;
    private src: any;
    private x: any;
    private y: any;
    private isBlock: boolean;
    constructor(src) {
        this.width = itemWidth;
        this.height = itemHeight;
        // 图片路径
        this.src = src;
        // x 坐标
        this.x = Math.floor(Math.random()*30);
        // y 坐标
        this.y = Math.floor(Math.random()*30);

        this.isBlock = false;
    }
    makeItem() {
        const imgDom = new Image();
        imgDom.src = this.src;
        // 获取位置
        let style = {
            left: this.x + "rem",
            top: this.y + "rem",
            width: this.width + "rem",
            height: this.height + "rem",
        };
        return imgDom;
    }
}