import Dexie from 'dexie'

export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

const database = new Dexie('markdown-editor')
database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

// メモを保存する関数
export const putMemo = async (title: string, text: string): Promise<void> => {
  // ISO8601形式での日時の生成 (保存のタイミングで自動的に付与)
  const datetime = new Date().toISOString()
  // IndexedDB に保存
  await memos.put({ datetime, title, text })
}

const NUM_PER_PAGE: number = 10

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  return pageCount > 0 ? pageCount : 1
}

// テキスト履歴を取得する関数
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datetime')
    .reverse()
    .offset(offset) // リスト内の開始位置
    .limit(NUM_PER_PAGE) // 取得件数
    .toArray() // 取得したデータを配列に変換
}