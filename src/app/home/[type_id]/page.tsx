'use client'

/**
 * 資格一覧画面
 * @screenname ExamListScreen
 * @discription 資格種類を一覧表示する画面
 */

type Props = {
  params: {
    type_id: string
  }
}
export default function ExamListScreen({ params }: Props) {
  return (
    <div>
      <h1>{params.type_id}</h1>
    </div>
  )
}
