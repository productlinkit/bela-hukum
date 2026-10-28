import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { IMG, user, articles } from "@/lib/data";
import { features } from "@/lib/features";
import { currentPlan, upgradeTarget, quota } from "@/lib/plans";

const UNREAD = 2;

export default function Home() {
  return (
    <div className="view">
      <header className="top">
        <div className="top-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src={IMG(10)} alt="BELA — Teman Hukum Kamu" />
          <div className="right">
            <span className="quota">
              <i />
              {currentPlan.name.replace("BELA ", "")} · {quota.left} tersisa
            </span>
            {/* [Bell] unread count carried in the accessible name (4.1.2) */}
            <Link className="bell" href="/notifikasi" aria-label={`Notifikasi, ${UNREAD} belum dibaca`}>
              <Icon name="bell" size={14} className="ic-line" />
              {UNREAD > 0 && (
                <span className="nbadge" aria-hidden="true">
                  {UNREAD}
                </span>
              )}
            </Link>
          </div>
        </div>
        <p className="hello">Selamat datang,</p>
        <h1 className="name">{user.name} 👋</h1>
      </header>

      <main className="scroll pad" id="main" style={{ paddingTop: 8 }}>
        {/* [P3 UI] Hero with a visible input affordance + CTA */}
        <section className="hero hero-col" aria-label="Mulai Tanya BELA">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG(2)} alt="" />
          <div className="hero-text">
            <h2>Tanya BELA</h2>
            <p>Ada masalah hukum? Ceritakan di sini.</p>
          </div>
          <Link className="hero-input" href="/tanya">
            <span className="hi-ic">
              <Icon name="message" size={16} />
            </span>
            <span>Ceritakan masalah Anda…</span>
            <span className="send-mini" aria-hidden="true">
              ➤
            </span>
          </Link>
        </section>

        <div className="sec">
          <h2>Layanan Hukum</h2>
          <Link className="see" href="/layanan">
            Lihat semua ›
          </Link>
        </div>

        <div className="grid">
          {features.map((f) => (
            <Link key={f.href} className={`svc ${f.cls}`} href={f.href}>
              <span className="svcico" aria-hidden="true" style={{ color: f.color }}>
                <Icon name={f.icon} size={28} />
              </span>
              <span>{f.label}</span>
            </Link>
          ))}
        </div>

        {/* [P2] Plan copy pulled from the single source of truth */}
        <Link className="upg" href="/paket" aria-label={`Upgrade ke ${upgradeTarget.name}, ${upgradeTarget.price}${upgradeTarget.period}`}>
          <span className="upg-badge">
            <Icon name="crown" size={12} /> Paling Populer
          </span>
          <div className="upg-title">
            Upgrade ke <b>{upgradeTarget.name}</b>
          </div>
          <ul className="upg-benefits">
            {upgradeTarget.benefits.map((bnf) => (
              <li key={bnf}>
                <span className="ck" aria-hidden="true">
                  <Icon name="check" size={11} />
                </span>
                {bnf}
              </li>
            ))}
          </ul>
          <div className="upg-foot">
            <div className="upg-price">
              <strong>{upgradeTarget.price}</strong>
              <span>{upgradeTarget.period}</span>
            </div>
            <span className="upg-cta">
              Upgrade <Icon name="arrowRight" size={16} />
            </span>
          </div>
        </Link>

        <div className="sec">
          <h2>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <Icon name="book" size={16} /> Bekal Hukum Hari Ini
            </span>
          </h2>
          <Link className="see" href="/bekal">
            Lihat semua ›
          </Link>
        </div>

        {articles.map((a, i) => (
          <Link key={i} className="art" href={`/bekal?a=${i}`}>
            <div className="th">
              <Icon name="book" size={24} />
            </div>
            <div className="bd">
              <span className={`tag ${a.g ? "g" : ""}`}>{a.tag}</span>
              <h3 style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>{a.t}</h3>
              <p>{a.d}</p>
              <time>{a.date}</time>
            </div>
            <span className="go">›</span>
          </Link>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
