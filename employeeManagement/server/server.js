import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュールで__dirnameを使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// ミドルウェアの設定
app.use(cors()); // CORS対応
app.use(express.json()); // JSONリクエストボディの解析
app.use(express.static(path.join(__dirname, '../client'))); // 静的ファイルの提供

// データファイルのパス
const dataPath = path.join(__dirname, 'data.json');

// データファイルが存在しない場合は初期データを作成
if (!fs.existsSync(dataPath)) {
    const initialData = {
        employees: [
            { id: 1, name: '山田太郎', age: 30 },
            { id: 2, name: '佐藤花子', age: 25 },
            { id: 3, name: '鈴木一郎', age: 35 }
        ]
    };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
    console.log('初期データファイルを作成しました');
}

// データの読み込み
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

// データの書き込み
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// 全社員の取得 (Read)
app.get('/api/employees', (req, res) => {
    const data = readData();
    res.json(data.employees);
    console.log('全社員データを取得しました');
});

// 特定の社員の取得 (Read)
app.get('/api/employees/:id', (req, res) => {
    const data = readData();
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    if (employee) {
        res.json(employee);
        console.log(`ID: ${req.params.id} の社員データを取得しました`);
    } else {
        res.status(404).json({ message: '社員が見つかりません' });
    }
});

// 社員の追加 (Create)
app.post('/api/employees', (req, res) => {
    const data = readData();
    const { name, age } = req.body;

    // 入力検証
    if (!name || !age) {
        return res.status(400).json({ message: '名前と年齢は必須です' });
    }

    // 新しいIDを生成（既存の最大ID + 1）
    const maxId = data.employees.length > 0
        ? Math.max(...data.employees.map(emp => emp.id))
        : 0;
    const newId = maxId + 1;

    // 新しい社員を追加
    const newEmployee = {
        id: newId,
        name,
        age: parseInt(age)
    };

    data.employees.push(newEmployee);
    writeData(data);

    res.status(201).json(newEmployee);
    console.log(`新しい社員を追加しました: ${name}`);
});

// 社員の更新 (Update)
app.put('/api/employees/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const { name, age } = req.body;

    // 入力検証
    if (!name || !age) {
        return res.status(400).json({ message: '名前と年齢は必須です' });
    }

    // 社員を検索
    const employeeIndex = data.employees.findIndex(emp => emp.id === id);

    if (employeeIndex === -1) {
        return res.status(404).json({ message: '社員が見つかりません' });
    }

    // 社員情報を更新
    data.employees[employeeIndex] = {
        id,
        name,
        age: parseInt(age)
    };

    writeData(data);

    res.json(data.employees[employeeIndex]);
    console.log(`ID: ${id} の社員情報を更新しました`);
});

// 社員の削除 (Delete)
app.delete('/api/employees/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    // 社員を検索
    const employeeIndex = data.employees.findIndex(emp => emp.id === id);

    if (employeeIndex === -1) {
        return res.status(404).json({ message: '社員が見つかりません' });
    }

    // 社員を削除
    const deletedEmployee = data.employees[employeeIndex];
    data.employees.splice(employeeIndex, 1);

    writeData(data);

    res.json(deletedEmployee);
    console.log(`ID: ${id} の社員を削除しました`);
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`サーバーが http://localhost:${PORT} で起動しました`);
});

// 実行例を表示
console.log('サーバーを起動しています...');