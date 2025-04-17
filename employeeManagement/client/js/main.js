// APIのベースURL
const API_URL = 'http://localhost:3000/api/employees';

// DOM要素
const employeeList = document.getElementById('employeeList');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

// ページ読み込み時に社員一覧を取得
document.addEventListener('DOMContentLoaded', fetchEmployees);

/**
 * 社員一覧を取得する関数
 */
async function fetchEmployees() {
    // ローディング表示
    showLoading(true);
    hideError();

    try {
        // APIから社員データを取得
        const response = await fetch(API_URL);

        // レスポンスが正常でない場合はエラーをスロー
        if (!response.ok) {
            throw new Error('社員データの取得に失敗しました');
        }

        // JSONデータを解析
        const employees = await response.json();

        // 社員一覧を表示
        displayEmployees(employees);
    } catch (error) {
        // エラーメッセージを表示
        showError(error.message);
        console.error('Error:', error);
    } finally {
        // ローディング非表示
        showLoading(false);
    }
}

/**
 * 社員一覧を表示する関数
 * @param {Array} employees - 社員データの配列
 */
function displayEmployees(employees) {
    // テーブルの内容をクリア
    employeeList.innerHTML = '';

    // 社員データがない場合
    if (employees.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center;">社員データがありません</td>';
        employeeList.appendChild(row);
        return;
    }

    // 各社員のデータを表示
    employees.forEach(employee => {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.age}</td>
      <td>
        <a href="edit.html?id=${employee.id}" class="btn btn-primary">編集</a>
        <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">削除</button>
      </td>
    `;

        employeeList.appendChild(row);
    });
}

/**
 * 社員を削除する関数
 * @param {number} id - 削除する社員のID
 */
async function deleteEmployee(id) {
    // 削除の確認
    if (!confirm(`ID: ${id} の社員を削除してもよろしいですか？`)) {
        return;
    }

    try {
        // APIに削除リクエストを送信
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        // レスポンスが正常でない場合はエラーをスロー
        if (!response.ok) {
            throw new Error('社員の削除に失敗しました');
        }

        // 削除成功メッセージ
        alert('社員を削除しました');

        // 社員一覧を再取得
        fetchEmployees();
    } catch (error) {
        // エラーメッセージを表示
        showError(error.message);
        console.error('Error:', error);
    }
}

/**
 * ローディング表示を制御する関数
 * @param {boolean} show - 表示するかどうか
 */
function showLoading(show) {
    loadingElement.style.display = show ? 'block' : 'none';
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