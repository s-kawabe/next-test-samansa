export function HomeLoading() {
  return (
    <div className="container-max">
      <div
        style={{
          padding: 'var(--spacing-24) 0 var(--spacing-16)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4)',
        }}
      >
        <div
          style={{
            height: 80,
            width: '60%',
            background: 'var(--color-background-muted)',
            borderRadius: 'var(--radius-sm)',
          }}
        />
        <div
          style={{
            height: 14,
            width: 200,
            background: 'var(--color-background-muted)',
            borderRadius: 'var(--radius-xs)',
          }}
        />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ paddingBottom: 'var(--spacing-16)' }}>
          <div
            style={{
              height: 40,
              width: 200,
              background: 'var(--color-background-muted)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 'var(--spacing-6)',
            }}
          />
          <div style={{ display: 'flex', gap: 16 }}>
            {[1, 2, 3, 4].map((j) => (
              <div
                key={j}
                style={{
                  width: 280,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-3)',
                }}
              >
                <div
                  style={{
                    aspectRatio: '16/9',
                    background: 'var(--color-background-muted)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                />
                <div
                  style={{
                    height: 16,
                    background: 'var(--color-background-muted)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeLoading;
