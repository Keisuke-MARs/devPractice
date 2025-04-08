# やること
### ローカル環境に作業ディレクトリ作る
<img width="570" alt="スクリーンショット 2025-04-08 10 24 59" src="https://github.com/user-attachments/assets/8853f472-8103-4e50-adc3-74322f5865dd" />

### リポジトリのクローン
各自のPC上のターミナル(コマンドプロンプトとか)で次のコマンド実行
```
git clone https://github.com/Keisuke-MARs/devPractice.git
```
<img width="570" alt="スクリーンショット 2025-04-08 10 26 15" src="https://github.com/user-attachments/assets/c8fb151f-50e3-4ee6-9f3c-d7d2d1dd4b7d" />


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
これのdevelopブランチを選んでも可<br/>
<img width="595" alt="スクリーンショット 2025-04-08 10 27 59" src="https://github.com/user-attachments/assets/8f2d1002-748b-44f5-b7d7-0f9bf5b65845" />

### ブランチ切る
```
git branch ブランチ名
```
**これだとブランチ作成からチェックアウトまで行ける**
```
git branch -b ブランチ名
```
GUIでやった方がやりやすいので、、ブランチ名入力(名前/キャメルケースで作業内容とか)<br/>
<img width="595" alt="スクリーンショット 2025-04-08 10 29 37" src="https://github.com/user-attachments/assets/2e1d0b19-2373-4207-8362-1c4492220a84" /><br/>
ブランチ名が変わります<br/>
<img width="416" alt="スクリーンショット 2025-04-08 10 30 40" src="https://github.com/user-attachments/assets/752ddd57-dff1-4028-a8a8-428ae479558c" />

### 作業する
コミットするよー<br/>
<img width="416" alt="スクリーンショット 2025-04-08 10 32 15" src="https://github.com/user-attachments/assets/5b0ebc5a-1973-40ec-8193-9dadb2189366" />
<br/>
ステージングしてコミットメッセージ書く<br/>
<img width="416" alt="スクリーンショット 2025-04-08 10 33 10" src="https://github.com/user-attachments/assets/3d071b49-890c-4513-94fe-ab87a024f251" /><br/>
コミットする<br/>

### developブランチにマージする
```
git push origin 作業しているブランチ名
```
プッシュを選びます<br/>
<img width="773" alt="スクリーンショット 2025-04-08 10 34 59" src="https://github.com/user-attachments/assets/98ae0544-84d0-42ba-9446-0d60027f25f6" /><br/>
OK押します<br/>
<img width="267" alt="スクリーンショット 2025-04-08 10 35 37" src="https://github.com/user-attachments/assets/50c9149d-0253-466d-90cc-c60fcda5ed03" />
<br/>

### GitHubのページに移動してプルリクエスト作成
自分以外の人をレビュアーに指定するレビューがおkなら
レビューしてもらう。必要があれば修正
<br/>
緑のボタン押す<br/>
<img width="1470" alt="スクリーンショット 2025-04-08 10 37 51" src="https://github.com/user-attachments/assets/3a0cb8b5-bae9-4bd5-9bff-108256722702" />
<br/>
プルリクエストを書きます。マークダウンという記法で書いています。勉強しといてください。このREADMEもマークダウンです<br/>
[マークダウン参考サイト](https://qiita.com/tbpgr/items/989c6badefff69377da7)
右上のReviewsでレビュワーを選びます。自分以外の人を選びましょう。<br/>
<img width="1261" alt="スクリーンショット 2025-04-08 10 43 18" src="https://github.com/user-attachments/assets/f781dcf5-d3a9-48a2-9e3a-e98e5a81cbe3" />
<br/>
書き終わったら緑のボタンを押します
<br/>
プルリクエストが完了しました。レビューを待ちます<br/>
<img width="1469" alt="スクリーンショット 2025-04-08 10 45 22" src="https://github.com/user-attachments/assets/86bf03ba-ab3b-48d2-9109-fd6721e74ca8" />

### マージする
レビューがおkならGitHub上でマージをする
<br/>
この緑のボタン押します
<img width="1469" alt="スクリーンショット 2025-04-08 10 48 22" src="https://github.com/user-attachments/assets/e5c491a8-177b-444b-9e1d-379a27057289" />


### developブランチに移動してpullを行う
リモートリポジトリのdevelopブランチの内容を反映させる<br/>
ローカルのdevelopブランチに移動して変更の同期をします<br/>
<img width="406" alt="スクリーンショット 2025-04-08 10 49 55" src="https://github.com/user-attachments/assets/666d062b-0f8d-4016-b6f4-0fadb0f65851" />
<br/>
こんな感じになればOKです
<br/>
<img width="406" alt="スクリーンショット 2025-04-08 10 51 01" src="https://github.com/user-attachments/assets/c45d76b6-14cf-463e-88e3-936030889655" />


### 新しいブランチを切って次の作業に入る
