<template>
  <div>
    <h1>Hello, world!</h1>
    <p>{{ image }}</p>
    <p>{{ file }}</p>
    <input type="file" id="file" @change="matting" />
    <button @click="fitch">开始抠图</button>
    <img :src="file.dataUrl" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Index extends Vue {
  // private file: File | {} = {};
  private file: any = {};
  private image: any = {};

  private matting(e: any) {
    this.file = e.target.files[0];
    this.createStream();
  }
  private createStream() {
    const reader = new FileReader();
    // const ext = this.imageData.name.substring(this.imageData.name.lastIndexOf(".") + 1).toLowerCase()
    // if (ext != 'png' && ext != 'jpg' && ext != 'jpeg') {
    //   alert("图片的格式必须为png或者jpg或者jpeg格式")
    //   return
    // }
    reader.onload = (e: any) => {
      const src = e.target.result;
      this.file.dataUrl = e.target.result;
      this.$set(this.file, "dataUrl", e.target.result);
      console.log("imageData", this.file);
      this.image = new Image();
      this.image.src = this.file.dataUrl;
      this.file.width = this.image.width;
      this.file.height = this.image.height;
    };
    reader.readAsDataURL(this.file);
  }

  private fitch() {
    let dataUrl;
    let c = document.createElement("canvas");
    c.width = this.file.width;
    c.height = this.file.height;
    const ctx: any = c.getContext("2d");
    ctx.drawImage(this.image, 0, 0);
    /**
     * 取图片四个脚边的像素点rgba
     * @type {*}
     */
    let tl = Array.prototype.slice
      .call(ctx.getImageData(0, 0, 1, 1).data)
      .join(",");
    let tr = Array.prototype.slice
      .call(ctx.getImageData(this.file.width - 1, 0, 1, 1).data)
      .join(",");
    let br = Array.prototype.slice
      .call(ctx.getImageData(this.file.width - 1, this.file.height - 1, 1, 1).data)
      .join(",");
    let bl = Array.prototype.slice
      .call(ctx.getImageData(0, this.file.height - 1, 1, 1).data)
      .join(",");
    let imgdata = [tl, tr, bl, br]; // 四个取色点
    let selfImageData: string[] = []; // 当前rgba
    imgdata.sort();
    // 目前只支持纯色背景抠图，简单的判断是否为纯色
    // let deferNum = this.unique(imgdata).length;
    // if (deferNum <= 1) {
    //   {
    //     selfImageData = imgdata[1].split(","); // 设置要扣除的主题色
    //     let isPNG = true; // 判断是否已经扣过
    //     let imgDataUrl = ctx.getImageData(0, 0, this.file.width, this.file.height); //获取像素点
    //     let data = imgDataUrl.data;
    //     for (let i = 0; i < data.length; i += 4) {
    //       // 得到 RGBA 通道的值
    //       let r = data[i];
    //       let g = data[i + 1];
    //       let b = data[i + 2];

    //       /**
    //        * function 判断颜色是不是属于背景色
    //        * @param numerical
    //        * @param index
    //        * @returns {boolean}
    //        */
    //       let isIn = (numerical, index) => {
    //         if (selfImageData[3] === '0') {
    //           isPNG = false;
    //           return false;
    //         }
    //         return (
    //           numerical > parseInt(selfImageData[index]) &&
    //           numerical < parseInt(selfImageData[index])
    //         ); // 去掉边缘色
    //       };

    //       if ([r, g, b].every(isIn)) {
    //         data[i + 3] = 0; // 设置背景透明
    //       }
    //     }
    //     // 将修改后的代码复制回画布中
    //     ctx.putImageData(imgDataUrl, 0, 0);
    //     dataUrl = c.toDataURL("image/png");
    //     if (isPNG) {
    //       /**
    //        * 创建下载链接 进行图片下载
    //        * @type {Element}
    //        */
    //       let a = document.createElement("a");
    //       a.href = dataUrl; //下载图片
    //       a.download = "未命名.png";
    //       a.click();
    //     } else {
    //       alert("背景已抠除！");
    //     }
    //   }
    // } else {
    //   alert("只支持纯色背景抠图！");
    // }
  }
}
</script>
