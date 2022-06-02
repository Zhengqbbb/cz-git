<script setup lang="ts">
import Emoji from "./Emoji.vue";
</script>
<template>
  <div class="features">
    <div class="feature">
      <h2>Friendly First</h2>
      <p>
        Friendly command line tool, Supports search and selection on the command line, reducing
        spelling errors.To be a lazyman.
      </p>
    </div>
    <div class="feature">
      <h2>Highly Customizable</h2>
      <p>Enjoy the customization process to make the tool more in line with your or team habits.</p>
    </div>
    <div class="feature">
      <h2>Engineering Support</h2>
      <p>
        Reduce repetitive typing. Better for engineering repo(e.g:monorepo) or business system. Easy
        link with issue.
      </p>
    </div>
    <div class="feature">
      <h2>With Commitlint</h2>
      <p>Dynamically get commitlint configuration and give command line prompts.</p>
    </div>
    <div class="feature">
      <h2>Lightweight</h2>
      <p>
        $ npm install -D cz-git<br />
        + cz-git
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        (<span class="token number"> 1.8 MB </span>) <br />added &nbsp;<span class="token number"
          >1</span
        >&nbsp; package in &nbsp;<span class="token number">0.461s</span>
      </p>
    </div>
    <div class="feature">
      <h2>Emoji Support</h2>
      <p><Emoji /> Support emoji in commit message.</p>
    </div>
  </div>
</template>
