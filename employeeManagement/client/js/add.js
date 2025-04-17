// APIのベースURL
const API_URL = 'http://localhost:3000/api/employees';

// DOM要素
const addEmployeeForm = document.getElementById('addEmployeeForm');
const errorElement = document.getElementById('error');

// フォーム送信イベントのリスナー
addEmployeeForm.addEventListener('submit', handleSubmit);

/**
 * フォーム送信ハンドラ
 * @param {Event} event - イベントオブジェクト
 */
async function handleSubmit(event) {
    // デフォルトのフォーム送信を防止
    event.preventDefault();

    // エラーメッセージを非表示
    hideError();

    // フォームデータの取得
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;

    // 入力検証
    if (!name) {
        showError('名前を入力してください');
        return;
    }

    if (!age || isNaN(age) || age < 18 || age > 100) {
        showError('有効な年齢（18〜100）を入力してください');
        return;
    }

    try {
        // APIに社員追加リクエストを送信
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age })
        });

        // レスポンスが正常でない場合はエラーをスロー
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '社員の追加に失敗しました');
        }

        // 追加した社員データを取得
        const newEmployee = await response.json();

        // 追加成功メッセージ
        alert(`${newEmployee.name}さんを社員として登録しました`);

        // フォームをリセット
        addEmployeeForm.reset();

        // 一覧ページにリダイレクト
        window.location.href = 'index.html';
    } catch (error) {
        // エラーメッセージを表示
        showError(error.message);
        console.error('Error:', error);
    }
}

/**
 * エラーメッセージを表示する関数
 * @param {string} message - エラーメッセージ
 */
function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * エラーメッセージを非表示にする関数
 */
function hideError() {
    errorElement.style.display = 'none';
}