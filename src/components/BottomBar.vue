<script>
export default {
  name: "BottomBar"
}
</script>

<template>
  <div id="bottom-wrapper">
    <div id="bottom-wrapper-inner">
      <div class="component">
        <a href="https://github.com/Kwanhooo" target="_blank">
          <div class="title">
            <span>关于作者</span>
            <img src="/src/assets/svg/go.svg" class="go">
          </div>
        </a>
      </div>
      <div class="component">
        <a href="https://github.com/Kwanhooo/PowerInk-Project" target="_blank">
          <div class="title">
            <span>源代码</span>
            <img src="/src/assets/svg/go.svg" class="go">
          </div>
        </a>
      </div>
      <div class="component">
        <a href="https://uri.amap.com/marker?position=112.99,28.14&name=中南大学（铁道校区）&src=&coordinate=&callnative=0"
           target="_blank">
          <div class="title">
            <span>Made With ❤️ in Changsha</span>
            <img src="/src/assets/svg/go.svg" class="go">
          </div>
        </a>
      </div>
    </div>
  </div>
  <div id="copyright-wrapper">
    <div style="margin-left: 20%;margin-top: 30px">作者&nbsp;&nbsp;|&nbsp;&nbsp;Kwanho Lee&nbsp;&nbsp;|&nbsp;&nbsp;工业和信息化部备案&nbsp;&nbsp;|&nbsp;&nbsp;
      粤ICP备2022013690号-2
    </div>
    <div style="margin-right: 20%;margin-top: 30px">版权所有 © 2023 0xCAFEBABE Studio and/or its affiliates.</div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

#bottom-wrapper {
  margin-top: 250px;
  width: 100%;
  height: 125px;
  background-color: #ffffff;
}

#bottom-wrapper-inner {
  display: flex;
  justify-content: space-between;
  margin: 0 22rem;
}

#copyright-wrapper {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #f5f5f7;
  color: #666666;
  font-size: .8rem;
  display: flex;

  justify-content: space-between;
  /*padding-top: 100px;*/
  /*background-color: gray;*/
}


.component {
  height: 100%;
  margin-top: 3rem;
  /*background-color: gray;*/
}

.component .title {
  font-size: 1.6rem;
  font-weight: 600;
}

.title:hover {
  cursor: pointer;
}

.go {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: .5rem;
}

</style>
