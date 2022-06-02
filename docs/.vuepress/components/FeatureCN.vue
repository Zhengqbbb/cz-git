<script setup lang="ts">
import Emoji from "./Emoji.vue";
</script>

<template>
  <div class="features">
    <div class="feature">
      <h2>交互至上</h2>
      <p>友好型命令行工具，支持搜索和选择在命令行中，减少拼写错误，极致“懒”。</p>
    </div>
    <div class="feature">
      <h2>高度自定义</h2>
      <p>享受探索自定义的过程，让工具更契合你或团队习惯。</p>
    </div>
    <div class="feature">
      <h2>工程化支持</h2>
      <p>
        适合管理工程化项目(比如 monorepo )或业务系统。让 commit 与 issue 关联更简单，特别在 gitee
        当中。
      </p>
    </div>
    <div class="feature">
      <h2>与 Commitlint 配合</h2>
      <p>获取 commitlint 相关配置，给予命令行提示信息。</p>
    </div>
    <div class="feature">
      <h2>轻量级</h2>
      <p>
        $ npm install -D cz-git<br />
        + cz-git
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        (<span class="token number"> 1.7 MB </span>) <br />added &nbsp;<span class="token number"
          >1</span
        >&nbsp; package in &nbsp;<span class="token number">0.461s</span>
      </p>
    </div>
    <div class="feature">
      <h2>Emoji 支持</h2>
      <p><Emoji /> 支持在 commit 信息中携带 Emoji。</p>
    </div>
  </div>
</template>
