<div align="center">
  <h1>Rojo Build Action</h1>
  This action swiftly builds your rojo places, models & assets. 
  <br>
  <br>
  <img src="https://media.discordapp.net/attachments/1016799328389574747/1031582625418190888/unknown.png"></img> 
</div>                                                                                   



## Inputs

### `output`

**Required** This is the file you want the action to output the build at. Make sure this does not include any file extensions. 

### `type`

**Required** The type of file to output (rbxm, rbxlx, etc.). Defaults to rbxlx.  

## Example usage

```yml
on:
  workflow_dispatch:
  push: {branches: ["master", "main"]}

jobs:
  status:
    runs-on: ubuntu-latest
    name: Build Rojo Project
    steps:
      - name: Checkout files
        uses: actions/checkout@v3
      - name: Build
        uses: CompeyDev/rojo-build-action@0.1.5
        with:
          output: model
          type: rbxm
      - name: Commit and push if there are changes
        run: |-
          git diff
          git config --global user.email "hi@devcomp.xyz"
          git config --global user.name "BuildBot"
          git diff --quiet || (git add -u && git commit -m "chore(deploy): build rojo project")
          git push               
```

This repository is licensed under a [MIT](https://compeydev.mit-license.org) License.
