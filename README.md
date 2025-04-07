# やること
### リポジトリのクローン
各自のPC上のターミナル(コマンドプロンプトとか)で次のコマンド実行
```
git clone https://github.com/Keisuke-MARs/devPractice.git
```

### クローン先へ移動、vsコード立ち上げ
クローン後のディレクトリに移動
```
cd devPractice
```

VSコード開く
```
code .
```

あとはCUIでもGUIでも操作おｋ</br>
[Gitコマンドチートシート](https://note.com/kasutakei/n/n8db0cfc953a9)

### 作業方法
developブランチへ移動
```
git checkout develop
```

### ブランチ切る
```
git branch ブランチ名
```
**これだとブランチ作成からチェックアウトまで行ける**
```
git branch -b ブランチ名
```

### 作業する

### developブランチにマージする
```
git push origin 作業しているブランチ名
```

### GitHubのページに移動してプルリクエスト作成
自分以外の人をレビュアーに指定するレビューがおkなら
レビューしてもらう。必要があれば修正
### マージする
レビューがおkならGitHub上でマージをする

### developブランチに移動してpullを行う
リモートリポジトリのdevelopブランチの内容を反映させる

### 新しいブランチを切って次の作業に入る
