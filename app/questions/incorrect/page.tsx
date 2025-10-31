import InCorrect from "@/app/_components/Incorrect";

interface IncorrectPageProps {
    searchParams: {
        questionId?: string; // URLから渡される「questionId」というパラメータ
    };
}

// 💡 修正点 2: Page関数の引数で、そのsearchParamsを受け取る
export default function Page({ searchParams }: IncorrectPageProps) {

    // 1. searchParamsからquestionId（文字列）を取り出す
    const questionIdStr = searchParams.questionId;

    // 2. IDがあれば数値に変換し、もしIDがない（URLに?questionId=Xがない）場合は安全のために1をデフォルトにする
    const idToPass = questionIdStr ? parseInt(questionIdStr, 10) : 1;

    return (
        // 💡 修正点 3: 固定値ではなく、動的に取得した idToPass を渡す
        <InCorrect id={idToPass} />
    )
}
