import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import { ReloadLoading } from '@/components'
import Provider from '@/providers'

export default function RootApp() {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    // Check modern PerformanceNavigationTiming if available
    try {
      const perfEntries = performance.getEntriesByType?.('navigation') as PerformanceNavigationTiming[] | undefined
      let isReload = false

      if (perfEntries && perfEntries.length > 0) {
        // Modern Navigation Timing API
        isReload = perfEntries[0].type === 'reload'
      } else {
        // Fallback to legacy PerformanceNavigation (avoid `any` by using unknown)
        const perf = performance as unknown as { navigation?: PerformanceNavigation }
        if (perf.navigation && typeof perf.navigation.type === 'number') {
          // PerformanceNavigation.type: 1 === reload (legacy)
          isReload = perf.navigation.type === 1
        }
      }

      if (isReload) {
        setShowLoader(true)
        // Keep loader visible briefly to give a smooth reload feel
        const t = setTimeout(() => setShowLoader(false), 3000)
        return () => clearTimeout(t)
      }
    } catch (e) {
      // If anything goes wrong, don't block rendering
      console.warn('reload-detection failed', e)
    }
  }, [])

  if (showLoader) return <ReloadLoading />

  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
