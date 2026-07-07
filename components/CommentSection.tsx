"use client";

interface Comment {

  id:number;

  nickname:string;

  content:string;

  date:string;

}

interface Props{

  comment:string;

  comments:Comment[];

  onCommentChange:(value:string)=>void;

  onSubmit:()=>void;

}

export default function CommentSection({

  comment,

  comments,

  onCommentChange,

  onSubmit,

}:Props){

  return(

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-black mb-8">

        Community

      </h2>

      <textarea

        value={comment}

        onChange={(e)=>onCommentChange(e.target.value)}

        placeholder="예측 의견을 남겨보세요."

        className="w-full h-36 rounded-2xl bg-slate-800 p-5 outline-none border border-slate-700 focus:border-cyan-500"

      />

      <button

        onClick={onSubmit}

        className="mt-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-8 py-3 font-black"

      >

        댓글 등록

      </button>

      <div className="mt-10 space-y-4">

        {comments.length===0&&(

          <div className="text-center text-slate-500 py-10">

            첫 번째 댓글을 작성해보세요.

          </div>

        )}

        {comments.map((c)=>(

          <div

            key={c.id}

            className="rounded-2xl bg-slate-800 p-5"

          >

            <div className="flex justify-between">

              <strong>

                {c.nickname}

              </strong>

              <span className="text-slate-400 text-sm">

                {c.date}

              </span>

            </div>

            <p className="mt-4 leading-7">

              {c.content}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}