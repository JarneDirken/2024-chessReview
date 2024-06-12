const Legend =() => {
    return (
        <div className="flex justify-center flex-col items-center border border-black mx-12">
            <h1 className="underline font-bold">Legend</h1>
            <div className="flex items-center">
                <div style={{ fontSize: '24px', color: 'green' }}>★</div>
                <span>= best move</span>
            </div>
        </div>
    );
}

export default Legend;