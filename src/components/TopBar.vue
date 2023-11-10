<script>
export default {
  name: "TopBar"
}
</script>

<template>
  <div id="top-bar-wrapper" class="glass">
    <div class="logo-wrapper">
      PowerInk™
    </div>
    <div class="user-wrapper">
      <div class="avatar-wrapper">
        <img class="avatar pointer" src="@/assets/svg/default-user-avatar.svg">
      </div>
      <div class="info-wrapper">
        <div class="username">
          Kwanho Lee
        </div>
        <div class="description">
          内幕人士
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#top-bar-wrapper {
  width: 100%;
  height: 50px;
  background: rgba(110, 110, 110, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 9999999;
}

.logo-wrapper {
  color: white;
  font-size: 27px;
  font-weight: 600;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}

.user-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  height: 36px;
  width: 36px;
  border-radius: 50% !important;
}

.info-wrapper {
  margin-left: .8rem;
  margin-right: 1rem;
}

.info-wrapper .username {
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: sans-serif;
  margin-bottom: 3px;
}

.info-wrapper .description {
  width: fit-content;
  color: white;
  font-size: 10px;
  font-weight: 500;
  font-family: sans-serif;
  background: #C81522AA;
  border-radius: 8px;
  padding: 0px 8px 2px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
