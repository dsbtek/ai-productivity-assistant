export function StatsCards({ emailCount, codeCount, qaCount, totalTokens }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="text-sm font-medium">Emails Summarized</h3>
                <p className="text-2xl font-bold">{emailCount}</p>
            </div>
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="text-sm font-medium">Code Explained</h3>
                <p className="text-2xl font-bold">{codeCount}</p>
            </div>
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="text-sm font-medium">Q&A Interactions</h3>
                <p className="text-2xl font-bold">{qaCount}</p>
            </div>
            <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="text-sm font-medium">Total Tokens Used</h3>
                <p className="text-2xl font-bold">{totalTokens}</p>
            </div>
        </div>
    );
}
