"use client";

import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function CompleteModal({ show, onClose }: { show: boolean; onClose: () => void }) {
    const [sparkles, setSparkles] = useState<{ top: string; left: string; delay: string }[]>([]);

    useEffect(() => {
        if (!show) return;
        const newSparkles = Array.from({ length: 8 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 2}s`,
        }));
        setSparkles(newSparkles);
    }, [show]);

    return (
        <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
            <Modal.Body
                className="position-relative text-center p-5"
                style={{
                    background: "linear-gradient(135deg, #e8e8e8 0%, #c9e4c5 50%, #a8d5ba 100%)",
                    borderRadius: "1.5rem",
                    border: "3px solid #a8d5ba",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                }}
            >
                {/* デコレーション */}
                <div className="position-absolute top-0 start-0 fs-3 opacity-50 m-3">🌟</div>
                <div className="position-absolute top-0 end-0 fs-3 opacity-50 m-3">🌟</div>
                <div className="position-absolute bottom-0 start-0 fs-3 opacity-50 m-3">🌟</div>
                <div className="position-absolute bottom-0 end-0 fs-3 opacity-50 m-3">🌟</div>

                {/* トロフィー */}
                <div
                    className="display-1 mb-4"
                    style={{
                        animation: "bounce 1s ease-in-out infinite",
                    }}
                >
                    🏆
                </div>

                {/* メインテキスト */}
                <h1 className="fw-bold mb-3 text-secondary text-shadow">コンプリート！</h1>
                <p className="fs-5 text-muted mb-4">おめでとうございます！</p>

                <div
                    className="p-4 rounded fw-semibold"
                    style={{
                        background: "#f0f9f4",
                        border: "2px solid #a8d5ba",
                        boxShadow: "0 4px 15px rgba(168, 213, 186, 0.2)",
                    }}
                >
                    全6個のスタンプを集めました！<br />
                    2階受付でこの画面を提示してね！<br />
                    早いものがちで良いことあるかも☆ミ
                </div>

                {/* スパークルエフェクト */}
                {sparkles.map((s, i) => (
                    <span
                        key={i}
                        className="position-absolute"
                        style={{
                            top: s.top,
                            left: s.left,
                            animation: "sparkle 2s ease-in-out infinite",
                            animationDelay: s.delay,
                            opacity: 0,
                        }}
                    >
            ✨
          </span>
                ))}

                <div className="mt-5">
                    <Button variant="success" onClick={onClose}>
                        OK
                    </Button>
                </div>
            </Modal.Body>

            {/* CSSアニメーション */}
            <style jsx global>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(168, 213, 186, 0.3);
        }
      `}</style>
        </Modal>
    );
}
