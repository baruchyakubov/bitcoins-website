import React from 'react'

export function MoveList({ moves }) {
    return (
        <section className='move-list container'>
            <ul>
                {moves.map(move =>
                    <li key={move.at}>
                        <p>To: {move.to}</p>
                        <p>At: {(new Date(move.at).toLocaleDateString())}</p>
                        <p>Amount: {move.amount} coins</p>
                    </li>
                )}
            </ul>
        </section>
    )
}