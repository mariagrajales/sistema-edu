import bannerImg from '../../assets/images/image.png'
import { StatusBadge } from '../../utils/atoms/StatusBadge'
import { AppPreviewImage } from '../../utils/molecules/AppPreviewImage'
import { InclusionQuoteCard } from '../../utils/molecules/InclusionQuoteCard'
import { loginContent } from '../constants/loginContent'

export function HeroPanel() {
  const { statusBadge, heroImageAlt, inclusionQuote } = loginContent.sidePanel

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-start">
        <StatusBadge label={statusBadge.label} dotColor={statusBadge.dotColor} />
      </div>
      <div
        className="relative z-10 rounded-[var(--radius-lg)] p-[2px]"
        style={{ backgroundImage: 'var(--gradient-photo-frame)' }}
      >
        <AppPreviewImage
          src={bannerImg}
          alt={heroImageAlt}
          className="login-banner relative aspect-video"
        />
      </div>
      <InclusionQuoteCard
        title={inclusionQuote.title}
        quote={inclusionQuote.quote}
        chips={[...inclusionQuote.chips]}
      />
    </div>
  )
}
