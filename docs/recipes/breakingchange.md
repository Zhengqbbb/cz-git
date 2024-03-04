# markBreakingChangeMode

> Add the ! mark in the header, Highlight that the commit message belongs to BREAKINGCHANGE. 

See: The rule by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples)<br>
E.g:
```
# Commit message with ! to draw attention to breaking change
feat!: send an email to the customer when a product is shipped

# Commit message with scope and ! to draw attention to breaking change
feat(api)!: send an email to the customer when a product is shipped

# Commit message with both ! and BREAKING CHANGE footer
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

## Use Option: `markBreakingChangeMode`
> Add extra "BREAKING CHANGE" question that if you need to add the =="!"== mark in the header

```js{6}
// .commitlintrc.js

/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    markBreakingChangeMode: true
  }
};
```

Demo:
![demo-gif](https://user-images.githubusercontent.com/40693636/175775159-710b69c6-ab55-4957-9195-6f963d95ba2e.gif) <!-- size=720x263 -->

## Use Commitizen CLI + cz-git
Try running command:
```sh
break=1 cz
```
Demo:
![demo-gif](https://user-images.githubusercontent.com/40693636/174949733-d5cd7f0d-ac81-40e8-8cb9-158737330d7a.gif) <!-- size=720x265 -->

## Use cz-git CLI `czg`
Try running command:
```sh
czg break
```
Demo:
![demo-gif](https://user-images.githubusercontent.com/40693636/175755362-2fdeed9e-cf05-4f41-b317-453154a5775c.gif) <!-- size=720x248 -->
