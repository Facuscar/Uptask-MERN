type TitleWithSpanProps = {
    title: string;
    spanTitle: string;
};

const TitleWithSpan: React.FC<TitleWithSpanProps> = ({ title, spanTitle }) => 
    <h1 className="text-sky-600 font-black text-6xl">{title} <span className="text-slate-700">{spanTitle}</span></h1>;

export default TitleWithSpan;