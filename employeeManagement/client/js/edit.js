// APIのベースURL
const API_URL = "http://localhost:3000/api/employees"

// DOM要素
const editEmployeeForm = document.getElementById("editEmployeeForm")
const employeeIdInput = document.getElementById("employeeId")
const nameInput = document.getElementById("name")
const ageInput = document.getElementById("age")
const cancelBtn = document.getElementById("cancelBtn")
const loadingElement = document.getElementById("loading")
const errorElement = document.getElementById("error")

// ページ読み込み時に社員データを取得
document.addEventListener("DOMContentLoaded", () => {
    // URLからIDを取得
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    if (!id) {
        // IDがない場合は一覧ページにリダイレクト
        window.location.href = "index.html"
        return
    }

    // 社員データを取得
    fetchEmployee(id)
})

// フォーム送信イベントのリスナー
editEmployeeForm.addEventListener("submit", handleSubmit)

// キャンセルボタンのイベントリスナー
cancelBtn.addEventListener("click", () => {
    window.location.href = "index.html"
})

/**
 * 社員データを取得する関数
 * @param {string} id - 社員ID
 */
async function fetchEmployee(id) {
    // ローディング表示
    showLoading(true)
    hideError()

    try {
        // APIから社員データを取得
        const response = await fetch(`${API_URL}/${id}`)

        // レスポンスが正常でない場合はエラーをスロー
        if (!response.ok) {
            throw new Error("社員データの取得に失敗しました")
        }

        // JSONデータを解析
        const employee = await response.json()

        // フォームに社員データを設定
        employeeIdInput.value = employee.id
        nameInput.value = employee.name
        ageInput.value = employee.age
    } catch (error) {
        // エラーメッセージを表示
        showError(error.message)
        console.error("Error:", error)
    } finally {
        // ローディング非表示
        showLoading(false)
    }
}

/**
 * フォーム送信ハンドラ
 * @param {Event} event - イベントオブジェクト
 */
async function handleSubmit(event) {
    // デフォルトのフォーム送信を防止
    event.preventDefault()

    // エラーメッセージを非表示
    hideError()

    // フォームデータの取得
    const id = employeeIdInput.value
    const name = nameInput.value.trim()
    const age = ageInput.value

    // 入力検証
    if (!name) {
        showError("名前を入力してください")
        return
    }

    if (!age || isNaN(age) || age < 18 || age > 100) {
        showError("有効な年齢（18〜100）を入力してください")
        return
    }

    try {
        // APIに社員更新リクエストを送信
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, age }),
        })

        // レスポンスが正常でない場合はエラーをスロー
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "社員情報の更新に失敗しました")
        }

        // 更新した社員データを取得
        const updatedEmployee = await response.json()

        // 更新成功メッセージ
        alert(`${updatedEmployee.name}さんの情報を更新しました`)

        // 一覧ページにリダイレクト
        window.location.href = "index.html"
    } catch (error) {
        // エラーメッセージを表示
        showError(error.message)
        console.error("Error:", error)
    }
}

/**
 * ローディング表示を制御する関数
 * @param {boolean} show - 表示するかどうか
 */
function showLoading(show) {
    loadingElement.style.display = show ? "block" : "none"
}

/**
 * エラーメッセージを表示する関数
 * @param {string} message - エラーメッセージ
 */
function showError(message) {
    errorElement.textContent = message
    errorElement.style.display = "block"
}

/**
 * エラーメッセージを非表示にする関数
 */
function hideError() {
    errorElement.style.display = "none"
}
